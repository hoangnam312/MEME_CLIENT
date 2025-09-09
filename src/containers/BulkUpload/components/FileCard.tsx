import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import AButton from 'src/component/atoms/AButton/AButton';
import { FileCardProps } from '../types';

const FileCard: React.FC<FileCardProps> = React.memo(
	({ fileData, onRemove, onEdit }) => {
		const fileSize = useMemo(
			() => (fileData.file.size / 1024 / 1024).toFixed(2),
			[fileData.file.size]
		);

		return (
			<div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
				<div className="relative w-full bg-gray-100 pt-[100%]">
					<img
						src={fileData.preview}
						alt={fileData.metadata.name || fileData.file.name}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
					<AButton
						onClick={(e) => {
							e.stopPropagation();
							onRemove(fileData.id);
						}}
						addClass="!absolute right-2 top-2 !p-3 text-red-500 bg-white/90 opacity-0 transition-all duration-200 hover:bg-red-500 hover:text-white group-hover:opacity-100"
					>
						<FontAwesomeIcon icon={faTrash} className="text-sm" />
					</AButton>
					<AButton
						onClick={(e) => {
							e.stopPropagation();
							onEdit(fileData.id);
						}}
						addClass="!absolute left-2 top-2 !p-3 bg-white/90 opacity-0 transition-all duration-200 hover:bg-emerald-500 hover:text-white group-hover:opacity-100"
					>
						<FontAwesomeIcon icon={faEdit} className="text-sm" />
					</AButton>
				</div>
				<div className="p-3">
					<p className="mb-1 truncate text-sm font-semibold text-gray-800">
						{fileData.metadata.name || fileData.file.name}
					</p>
					{fileData.metadata.description && (
						<p className="mb-1 line-clamp-2 text-xs text-gray-600">
							{fileData.metadata.description}
						</p>
					)}
					<p className="text-xs text-gray-500">
						{fileSize} {t('bulkUpload.mb')}
					</p>
				</div>
			</div>
		);
	}
);

export default FileCard;
