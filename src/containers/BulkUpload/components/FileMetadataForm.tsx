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
			addClassWrap="!w-full md:!w-3/4 lg:!w-2/3 xl:!w-1/2 max-h-[90vh]"
		>
			<div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white">
				<div className="flex items-center justify-between border-b border-gray-200 p-3 md:p-4 lg:p-6">
					<h2 className="text-lg font-semibold text-gray-900 md:text-xl">
						{t('bulkUpload.fileMetadata.title')}
					</h2>
					<AOutlineButton addClass="" onClick={onClose}>
						<FontAwesomeIcon icon={faX} className="text-gray-600" />
					</AOutlineButton>
				</div>

				<div className="overflow-y-auto p-3 md:p-4 lg:p-6">
					<div className="mb-4 md:mb-6">
						<img
							src={file.preview}
							alt={watchedName || file.file.name}
							className="max-h-48 w-full rounded-lg bg-gray-50 object-contain md:max-h-60 lg:max-h-72"
						/>
						<p className="mt-2 text-center text-xs text-gray-600 md:text-sm">
							{file.file.name} • {(file.file.size / 1024 / 1024).toFixed(2)}{' '}
							{t('bulkUpload.mb')}
						</p>
					</div>

					<form
						onSubmit={handleSubmit(handleSave)}
						className="space-y-3 md:space-y-4"
					>
						<div>
							<label className="mb-1 block text-xs font-medium text-gray-700 md:mb-2 md:text-sm">
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
							<label className="mb-1 block text-xs font-medium text-gray-700 md:mb-2 md:text-sm">
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

						<div className="flex flex-col justify-end gap-2 pt-3 sm:flex-row md:gap-3 md:pt-4">
							<AOutlineButton
								onClick={onClose}
								addClass="px-4 md:px-6 text-xs md:text-sm"
							>
								{t('bulkUpload.fileMetadata.cancel')}
							</AOutlineButton>
							<AButton
								onClick={handleSubmit(handleSave)}
								addClass="px-4 md:px-6 gap-1 md:gap-2 text-xs md:text-sm"
							>
								<FontAwesomeIcon icon={faSave} className="text-xs md:text-sm" />
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
