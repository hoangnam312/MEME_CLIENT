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
			<div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
				<div className="flex items-center gap-4 text-sm text-gray-600">
					<span className="font-medium">
						{files.length} {fileCountText} {t('bulkUpload.selected')}
					</span>
					<span className="text-gray-400">•</span>
					<span className="font-medium">
						{totalSize} {t('bulkUpload.mbTotal')}
					</span>
				</div>
				<div className="flex w-full gap-3 sm:w-auto">
					<AOutlineButton onClick={onClearAll} addClass="flex-1 sm:flex-none">
						{t('bulkUpload.clearAll')}
					</AOutlineButton>
					<AButton
						onClick={onUploadAll}
						isDisabled={files.length === 0}
						addClass="flex-1 sm:flex-none gap-2"
					>
						<FontAwesomeIcon icon={faUpload} />
						{t('bulkUpload.uploadAll')}
					</AButton>
				</div>
			</div>
		);
	}
);

export default FileStats;
