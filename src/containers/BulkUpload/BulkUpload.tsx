import {
	faArrowLeft,
	faCloudUpload,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { color } from 'src/config/style';
import { Path } from 'src/constants/type';
import {
	BulkMemeMetadata,
	createBulkMemes,
	getBulkUploadStatus,
	SSEProgressTracker,
} from 'src/service/bulkMeme';

import { UPLOAD_CONFIG } from '../../constants/BulkUpload';
import { DropZone, FileCard, FileStats } from './components';
import FileMetadataForm from './components/FileMetadataForm';
import { useFileValidation, useSSEHandlers } from './hooks';
import { FileWithMetadata, UploadState } from './types';
import { extractErrorMessage } from './utils/errorHandling';
import UploadProgressTracker from './UploadProgressTracker';

const BulkUpload: React.FC = () => {
	const navigate = useNavigate();
	const { uploadId: urlUploadId } = useParams<{ uploadId?: string }>();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const sseTracker = useRef(new SSEProgressTracker());

	const [files, setFiles] = useState<FileWithMetadata[]>([]);
	const [uploadState, setUploadState] = useState<UploadState>({
		isUploading: false,
		uploadId: urlUploadId || null,
		progress: null,
		results: [],
	});
	const [editingFileId, setEditingFileId] = useState<string | null>(null);

	const { setupSSEHandlers } = useSSEHandlers();
	const { validateFile } = useFileValidation();
	const baseURL = useMemo(
		() => import.meta.env.VITE_BASE_URL || window.location.origin,
		[]
	);

	useEffect(() => {
		if (urlUploadId && !uploadState.isUploading) {
			getBulkUploadStatus(urlUploadId)
				.then((response) => {
					if (response.data && response.data.status !== 'completed') {
						setUploadState({
							isUploading: true,
							uploadId: urlUploadId,
							progress: {
								type: 'progress',
								uploadId: urlUploadId,
								totalFiles: response.data.totalFiles,
								processedFiles: response.data.processedFiles,
								successCount: response.data.successCount,
								failedCount: response.data.failedCount,
								currentFile: response.data.currentFile,
								estimatedTimeRemaining: response.data.estimatedTimeRemaining,
								elapsedTime: response.data.elapsedTime,
								percentage: response.data.percentage,
								status: response.data.status,
							},
							results: [],
						});

						setupSSEHandlers(sseTracker.current, setUploadState);
						sseTracker.current.connect(urlUploadId, baseURL);
					} else if (response.data && response.data.status === 'completed') {
						setUploadState({
							isUploading: false,
							uploadId: urlUploadId,
							progress: {
								type: 'completed',
								uploadId: urlUploadId,
								totalFiles: response.data.totalFiles,
								processedFiles: response.data.processedFiles,
								successCount: response.data.successCount,
								failedCount: response.data.failedCount,
								currentFile: '',
								estimatedTimeRemaining: 0,
								elapsedTime: response.data.elapsedTime,
								percentage: 100,
								status: 'completed',
							},
							results: [],
						});
					}
				})
				.catch((error) => {
					console.error('Failed to get upload status:', error);
					if (error.response?.status === 404) {
						navigate('/bulk-upload', { replace: true });
					}
				});
		}
	}, [
		urlUploadId,
		setupSSEHandlers,
		baseURL,
		navigate,
		uploadState.isUploading,
	]);

	const handleFileSelect = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFiles = event.target.files;
			if (!selectedFiles) return;

			const newFiles: FileWithMetadata[] = [];

			for (
				let i = 0;
				i < Math.min(selectedFiles.length, UPLOAD_CONFIG.MAX_FILES);
				i++
			) {
				const file = selectedFiles[i];

				if (!validateFile(file)) {
					continue;
				}

				newFiles.push({
					file,
					preview: URL.createObjectURL(file),
					metadata: {
						name: file.name.replace(/\.[^/.]+$/, ''),
						description: '',
					},
					id: `${Date.now()}_${i}`,
				});
			}

			if (newFiles.length > 0) {
				setFiles((prev) =>
					[...prev, ...newFiles].slice(0, UPLOAD_CONFIG.MAX_FILES)
				);

				if (selectedFiles.length > UPLOAD_CONFIG.MAX_FILES) {
					toast.warning(
						t('bulkUpload.errors.maxFiles', { max: UPLOAD_CONFIG.MAX_FILES })
					);
				}
			}

			if (event.target) {
				event.target.value = '';
			}
		},
		[validateFile]
	);

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();

			const droppedFiles = event.dataTransfer.files;
			if (!droppedFiles) return;

			const fileEvent = {
				target: {
					files: droppedFiles,
					value: '',
				},
			} as React.ChangeEvent<HTMLInputElement>;
			handleFileSelect(fileEvent);
		},
		[handleFileSelect]
	);

	const handleDragOver = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.stopPropagation();
		},
		[]
	);

	const removeFile = useCallback((id: string) => {
		setFiles((prev) => {
			const fileToRemove = prev.find((f) => f.id === id);
			if (fileToRemove) {
				URL.revokeObjectURL(fileToRemove.preview);
			}
			return prev.filter((f) => f.id !== id);
		});
	}, []);

	const updateFileMetadata = useCallback(
		(id: string, metadata: BulkMemeMetadata) => {
			setFiles((prev) =>
				prev.map((f) => (f.id === id ? { ...f, metadata } : f))
			);
			setEditingFileId(null);
		},
		[]
	);

	const handleBulkUpload = useCallback(async () => {
		if (files.length === 0) {
			toast.error(t('bulkUpload.errors.noFiles'));
			return;
		}

		setUploadState({
			isUploading: true,
			uploadId: null,
			progress: null,
			results: [],
		});

		try {
			const formData = new FormData();

			files.forEach((fileData) => {
				formData.append('images', fileData.file);
			});

			const memesMetadata = files.map((f) => ({
				name: f.metadata.name || f.file.name,
				description: f.metadata.description || '',
			}));

			formData.append('memes', JSON.stringify(memesMetadata));

			const response = await createBulkMemes(formData);

			if (response.data.success && response.data.uploadId) {
				setUploadState((prev) => ({
					...prev,
					uploadId: response.data.uploadId,
				}));

				navigate(`/bulk-upload/${response.data.uploadId}`, { replace: true });

				setupSSEHandlers(sseTracker.current, setUploadState);
				sseTracker.current.connect(response.data.uploadId, baseURL);
			} else {
				throw new Error(t('bulkUpload.errors.initFailed'));
			}
		} catch (error: unknown) {
			console.error('Bulk upload error:', error);
			const errorMessage = extractErrorMessage(
				error,
				t('bulkUpload.errors.uploadFailed')
			);
			toast.error(errorMessage);
			setUploadState({
				isUploading: false,
				uploadId: null,
				progress: null,
				results: [],
			});
		}
	}, [files, navigate, setupSSEHandlers, baseURL]);

	const clearAll = useCallback(() => {
		files.forEach((f) => URL.revokeObjectURL(f.preview));
		setFiles([]);
		setUploadState({
			isUploading: false,
			uploadId: null,
			progress: null,
			results: [],
		});
		sseTracker.current.disconnect();
		if (urlUploadId) {
			navigate('/bulk-upload', { replace: true });
		}
	}, [urlUploadId, navigate, files]);

	const isUploadComplete = useMemo(
		() => uploadState.progress?.status === 'completed',
		[uploadState.progress]
	);
	const hasFiles = useMemo(() => files.length > 0, [files.length]);
	const editingFile = useMemo(
		() => files.find((f) => f.id === editingFileId),
		[files, editingFileId]
	);

	return (
		<div className="mx-auto min-h-screen max-w-7xl bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8">
			<div className="relative mb-4 text-center md:mb-8">
				<AOutlineButton
					addClass="!absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 scale-75 md:scale-100"
					onClick={() => navigate(-1)}
				>
					<FontAwesomeIcon icon={faArrowLeft} className="text-violet-900" />
				</AOutlineButton>
				<h1 className="bg-gradient-to-r bg-clip-text px-8 text-2xl font-bold text-transparent text-violet-900 md:px-0 md:text-3xl lg:text-4xl">
					{t('bulkUpload.title')}
				</h1>
				<p className="mt-1 px-2 text-sm text-gray-600 md:mt-2 md:text-base lg:text-lg">
					{t('bulkUpload.subtitle')}
				</p>
			</div>

			{!uploadState.isUploading && !isUploadComplete && (
				<>
					<DropZone
						hasFiles={hasFiles}
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onClick={() => !hasFiles && fileInputRef.current?.click()}
					>
						<input
							ref={fileInputRef}
							type="file"
							multiple
							accept={UPLOAD_CONFIG.ACCEPTED_FILE_TYPES}
							onChange={handleFileSelect}
							className="hidden"
						/>

						{!hasFiles ? (
							<>
								<FontAwesomeIcon
									icon={faCloudUpload}
									className="mb-2 text-4xl text-emerald-300 md:mb-4 md:text-5xl lg:text-6xl"
								/>
								<h3 className="mb-1 px-2 text-lg font-semibold text-gray-800 md:mb-2 md:text-xl">
									{t('bulkUpload.dropZone.title')}
								</h3>
								<p className="mb-1 px-2 text-sm text-gray-600 md:mb-2 md:text-base">
									{t('bulkUpload.dropZone.subtitle')}
								</p>
								<p className="mt-2 px-4 text-xs text-gray-500 md:mt-4 md:text-sm">
									{t('bulkUpload.dropZone.constraints')}
								</p>
							</>
						) : (
							<div className="grid w-full grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
								{files.map((fileData) => (
									<FileCard
										key={fileData.id}
										fileData={fileData}
										onRemove={removeFile}
										onEdit={setEditingFileId}
									/>
								))}
								<div
									className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-violet-500 hover:bg-white md:min-h-48"
									onClick={(e) => {
										e.stopPropagation();
										fileInputRef.current?.click();
									}}
								>
									<FontAwesomeIcon
										icon={faUpload}
										className="mb-1 text-xl md:mb-2 md:text-2xl"
										style={{ color: color.main }}
									/>
									<span className="px-1 text-center text-xs font-medium text-gray-600 md:text-sm">
										{t('bulkUpload.addMore')}
									</span>
								</div>
							</div>
						)}
					</DropZone>

					{hasFiles && (
						<FileStats
							files={files}
							onClearAll={clearAll}
							onUploadAll={handleBulkUpload}
						/>
					)}
				</>
			)}

			{(uploadState.isUploading || isUploadComplete) &&
				uploadState.progress && (
					<UploadProgressTracker
						progress={uploadState.progress}
						results={uploadState.results}
						onGoToMyMemes={() => navigate(Path.MY_MEME)}
						onViewMeme={(memeId) => navigate(`/meme/${memeId}`)}
						onRetry={() => {
							clearAll();
							window.location.reload();
						}}
					/>
				)}

			{editingFileId && editingFile && (
				<FileMetadataForm
					file={editingFile}
					onSave={(metadata) => updateFileMetadata(editingFileId, metadata)}
					onClose={() => setEditingFileId(null)}
				/>
			)}
		</div>
	);
};

export default BulkUpload;
