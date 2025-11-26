import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { FileStatsProps } from '../types';

const FileStats: React.FC<FileStatsProps> = React.memo(
	({ files, onClearAll, onUploadAll }) => {
		const totalSize = useMemo(
			() =>
				(files.reduce((acc, f) => acc + f.file.size, 0) / 1024 / 1024).toFixed(
					2
				),
			[files]
		);

		const fileCountText = useMemo(
			() =>
				files.length !== 1
					? t('bulkUpload.filesSelected')
					: t('bulkUpload.fileSelected'),
			[files.length]
		);

		return (
			<div className="mt-3 flex flex-col items-start justify-between gap-2 rounded-xl bg-white p-3 shadow-sm sm:flex-row sm:items-center md:mt-6 md:gap-4 md:p-4 lg:mt-8 lg:p-6">
				<div className="flex w-full flex-col items-start gap-1 text-xs text-gray-600 sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:text-sm">
					<span className="font-medium">
						{files.length} {fileCountText} {t('bulkUpload.selected')}
					</span>
					<span className="hidden text-gray-400 sm:inline">•</span>
					<span className="font-medium">
						{totalSize} {t('bulkUpload.mbTotal')}
					</span>
				</div>
				<div className="flex w-full gap-2 sm:w-auto md:gap-3">
					<AOutlineButton
						onClick={onClearAll}
						addClass="flex-1 sm:flex-none text-xs md:text-sm"
					>
						{t('bulkUpload.clearAll')}
					</AOutlineButton>
					<AButton
						onClick={onUploadAll}
						isDisabled={files.length === 0}
						addClass="flex-1 sm:flex-none gap-1 md:gap-2 text-xs md:text-sm"
					>
						<FontAwesomeIcon icon={faUpload} className="text-xs md:text-sm" />
						{t('bulkUpload.uploadAll')}
					</AButton>
				</div>
			</div>
		);
	}
);

export default FileStats;
