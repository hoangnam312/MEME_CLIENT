import {
	faCheckCircle,
	faCopy,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, { useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import { MemeUploadResult } from 'src/service/bulkMeme';

interface ResultCardProps {
	result: MemeUploadResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = (e: React.MouseEvent) => {
		e.stopPropagation();
		navigator.clipboard.writeText(result.imageUrl ?? '').then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<div className="group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
			<div className="relative w-full bg-gray-100 pt-[100%]">
				{result.imageUrl ? (
					<img
						src={result.imageUrl}
						alt={result.name ?? ''}
						className="absolute left-0 top-0 h-full w-full object-cover"
					/>
				) : (
					<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
						<FontAwesomeIcon
							icon={faExclamationTriangle}
							className="text-3xl text-gray-400"
						/>
					</div>
				)}

				<span
					className={`absolute left-2 top-2 rounded-full px-2 py-1 text-xs text-white ${
						result.status === 'success' ? 'bg-green-500' : 'bg-red-500'
					}`}
				>
					<FontAwesomeIcon
						icon={
							result.status === 'success'
								? faCheckCircle
								: faExclamationTriangle
						}
						className="mr-1"
					/>
					{result.status === 'success'
						? t('bulkUpload.progress.success').replace(':', '')
						: t('bulkUpload.result.uploadFailed')}
				</span>

				{result.imageUrl && (
					<AButton
						onClick={handleCopy}
						addClass="!absolute right-2 top-2 !p-3 bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-emerald-500 hover:text-white"
					>
						<FontAwesomeIcon
							icon={faCopy}
							className="text-sm"
							title={
								copied
									? t('bulkUpload.result.copied')
									: t('bulkUpload.result.copyImageUrl')
							}
						/>
					</AButton>
				)}
			</div>

			<div className="p-3">
				<p className="truncate text-sm font-semibold text-gray-800">
					{result.name ?? t('bulkUpload.progress.unnamedFile')}
				</p>
				{result.status === 'success' && result.memeId && (
					<p className="truncate text-xs text-gray-500">{result.memeId}</p>
				)}
				{result.status === 'failed' && result.error && (
					<p className="line-clamp-2 text-xs text-red-500">
						{result.error.message}
					</p>
				)}
			</div>
		</div>
	);
};

export default ResultCard;
