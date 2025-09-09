import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faX,
	faSave,
	faPen,
	faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import AModal from 'src/component/atoms/AModal/AModal';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { BulkMemeMetadata } from 'src/service/bulkMeme';

interface FileMetadataFormProps {
	file: {
		file: File;
		preview: string;
		metadata: BulkMemeMetadata;
		id: string;
	};
	onSave: (metadata: BulkMemeMetadata) => void;
	onClose: () => void;
}

const FileMetadataForm: React.FC<FileMetadataFormProps> = ({
	file,
	onSave,
	onClose,
}) => {
	const { register, handleSubmit, watch } = useForm<BulkMemeMetadata>({
		defaultValues: {
			name: file.metadata.name || file.file.name.replace(/\.[^/.]+$/, ''),
			description: file.metadata.description || '',
		},
	});

	const watchedName = watch('name');
	const watchedDescription = watch('description');

	const handleSave = (data: BulkMemeMetadata) => {
		onSave(data);
	};

	return (
		<AModal
			isOpen={true}
			closeModal={onClose}
			addClassBackdrop="backdrop-blur-sm bg-black/50"
			addClassWrap="!w-1/2 max-h-[90vh]"
		>
			<div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white">
				<div className="flex items-center justify-between border-b border-gray-200 p-6">
					<h2 className="text-xl font-semibold text-gray-900">
						{t('bulkUpload.fileMetadata.title')}
					</h2>
					<AOutlineButton addClass="" onClick={onClose}>
						<FontAwesomeIcon icon={faX} className="text-gray-600" />
					</AOutlineButton>
				</div>

				<div className="overflow-y-auto p-6">
					<div className="mb-6">
						<img
							src={file.preview}
							alt={watchedName || file.file.name}
							className="max-h-72 w-full rounded-lg bg-gray-50 object-contain"
						/>
						<p className="mt-2 text-center text-sm text-gray-600">
							{file.file.name} • {(file.file.size / 1024 / 1024).toFixed(2)}{' '}
							{t('bulkUpload.mb')}
						</p>
					</div>

					<form onSubmit={handleSubmit(handleSave)} className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								{t('bulkUpload.fileMetadata.memeName')}
							</label>
							<AInput
								icon={
									<FontAwesomeIcon className="text-violet-900" icon={faPen} />
								}
								rest={{
									placeholder: t('bulkUpload.fileMetadata.namePlaceholder'),
									maxLength: 100,
									...register('name'),
								}}
							/>
							<span className="mt-1 block text-right text-xs text-gray-500">
								{watchedName?.length || 0}/100
							</span>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								{t('bulkUpload.fileMetadata.description')}
							</label>
							<AInput
								addClassWrapper="mt-0"
								icon={
									<FontAwesomeIcon
										className="text-violet-900"
										icon={faPenToSquare}
									/>
								}
								rest={{
									placeholder: t(
										'bulkUpload.fileMetadata.descriptionPlaceholder'
									),
									maxLength: 500,
									...register('description'),
								}}
							/>
							<span className="mt-1 block text-right text-xs text-gray-500">
								{watchedDescription?.length || 0}/500
							</span>
						</div>

						<div className="flex justify-end gap-3 pt-4">
							<AOutlineButton onClick={onClose} addClass="px-6">
								{t('bulkUpload.fileMetadata.cancel')}
							</AOutlineButton>
							<AButton onClick={handleSubmit(handleSave)} addClass="px-6 gap-2">
								<FontAwesomeIcon icon={faSave} />
								{t('bulkUpload.fileMetadata.saveChanges')}
							</AButton>
						</div>
					</form>
				</div>
			</div>
		</AModal>
	);
};

export default FileMetadataForm;
