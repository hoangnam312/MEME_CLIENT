import {
	faCheckCircle,
	faExclamationTriangle,
	faHourglassHalf,
	faRefresh,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { BulkUploadProgress, MemeUploadResult } from 'src/service/bulkMeme';

interface UploadProgressTrackerProps {
	progress: BulkUploadProgress;
	results: MemeUploadResult[];
	onGoToMyMemes: () => void;
	onViewMeme: (memeId: string) => void;
	onRetry: () => void;
}

const UploadProgressTracker: React.FC<UploadProgressTrackerProps> = ({
	progress,
	onGoToMyMemes,
	onRetry,
}) => {
	const isComplete = progress.status === 'completed';
	const hasError = progress.status === 'error';
	const isProcessing = progress.status === 'processing';

	const formatTime = (seconds: number): string => {
		if (seconds < 60) return `${seconds}s`;
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}m ${remainingSeconds}s`;
	};

	return (
		<div className="rounded-xl bg-white p-3 shadow-sm md:p-4 lg:p-6">
			<div className="mb-3 md:mb-6">
				<h2 className="mb-2 text-lg font-semibold text-gray-900 md:mb-4 md:text-xl lg:text-2xl">
					{isComplete
						? t('bulkUpload.progress.uploadComplete')
						: hasError
						? t('bulkUpload.progress.uploadFailed')
						: t('bulkUpload.progress.uploadingMemes')}
				</h2>

				{isProcessing && (
					<div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4 md:gap-4 md:text-sm">
						<div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.progress')}
							</span>
							<span className="font-semibold text-gray-900">
								{progress.processedFiles} / {progress.totalFiles}
							</span>
						</div>
						<div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.success')}
							</span>
							<span className="font-semibold text-green-600">
								{progress.successCount}
							</span>
						</div>
						<div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.failed')}
							</span>
							<span className="font-semibold text-red-600">
								{progress.failedCount}
							</span>
						</div>
						<div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.timeRemaining')}
							</span>
							<span className="font-semibold text-gray-900">
								{formatTime(progress.estimatedTimeRemaining)}
							</span>
						</div>
					</div>
				)}
			</div>

			<div className="mb-3 md:mb-6">
				<div className="relative h-5 overflow-hidden rounded-full bg-gray-200 md:h-6">
					<div
						className="flex h-full items-center justify-center bg-gradient-to-r from-violet-300 to-violet-900 transition-all duration-500 ease-out"
						style={{ width: `${progress.percentage}%` }}
					>
						{progress.percentage > 15 && (
							<span className="text-xs font-semibold text-white md:text-sm">
								{progress.percentage}%
							</span>
						)}
					</div>
					{progress.percentage <= 15 && (
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-xs font-semibold text-gray-700 md:text-sm">
								{progress.percentage}%
							</span>
						</div>
					)}
				</div>
			</div>

			{isProcessing && progress.currentFile && (
				<div className="mb-3 flex items-center gap-2 rounded-lg bg-gray-50 p-2 md:mb-6 md:gap-3 md:p-4">
					<FontAwesomeIcon
						icon={faSpinner}
						className="text-sm text-violet-900 md:text-base"
						spin
					/>
					<span className="truncate text-xs text-gray-700 md:text-sm">
						{progress.currentFile}
					</span>
				</div>
			)}

			<div className="mt-4 md:mt-8">
				<div className="py-6 text-center text-gray-500 md:py-12">
					{isProcessing ? (
						<>
							<FontAwesomeIcon
								icon={faHourglassHalf}
								spin
								className="mb-2 text-2xl text-emerald-300 md:mb-4 md:text-3xl lg:text-4xl"
							/>
							<p className="mb-1 px-2 text-base font-medium md:mb-2 md:text-lg">
								{t('bulkUpload.progress.processingMemes')}
							</p>
							<p className="px-4 text-xs md:text-sm">
								{t('bulkUpload.progress.processingDescription')}
							</p>
						</>
					) : (
						<p className="text-sm md:text-base">
							{t('bulkUpload.progress.noResultsYet')}
						</p>
					)}
				</div>
			</div>

			{(isComplete || hasError) && (
				<div className="mt-4 border-t border-gray-200 pt-4 md:mt-8 md:pt-8">
					{isComplete && (
						<div className="mb-4 flex items-start gap-2 md:mb-6 md:gap-4">
							<FontAwesomeIcon
								icon={faCheckCircle}
								className="mt-1 flex-shrink-0 text-xl text-green-500 md:text-2xl lg:text-3xl"
							/>
							<div className="flex-1">
								<h3 className="mb-1 text-base font-semibold text-gray-900 md:mb-2 md:text-lg lg:text-xl">
									{t('bulkUpload.progress.successfullyUploaded', {
										successCount: progress.successCount,
										totalFiles: progress.totalFiles,
									})}
								</h3>
								{progress.failedCount > 0 && (
									<p className="mb-1 text-xs text-amber-600 md:text-sm">
										{t('bulkUpload.progress.filesFailedToUpload', {
											failedCount: progress.failedCount,
											plural: progress.failedCount !== 1 ? 's' : '',
										})}
									</p>
								)}
								<p className="text-xs text-gray-500 md:text-sm">
									{t('bulkUpload.progress.totalTime', {
										time: formatTime(progress.elapsedTime),
									})}
								</p>
							</div>
						</div>
					)}

					{hasError && (
						<div className="mb-4 flex items-start gap-2 md:mb-6 md:gap-4">
							<FontAwesomeIcon
								icon={faExclamationTriangle}
								className="mt-1 flex-shrink-0 text-xl text-red-500 md:text-2xl lg:text-3xl"
							/>
							<div className="flex-1">
								<h3 className="mb-1 text-base font-semibold text-gray-900 md:mb-2 md:text-lg lg:text-xl">
									{t('bulkUpload.progress.uploadProcessError')}
								</h3>
								<p className="text-xs text-gray-600 md:text-sm">
									{t('bulkUpload.progress.tryAgainMessage')}
								</p>
							</div>
						</div>
					)}

					<div className="flex flex-col justify-center gap-2 sm:flex-row md:gap-3">
						{(hasError || progress.failedCount > 0) && (
							<AOutlineButton
								onClick={onRetry}
								addClass="gap-1 md:gap-2 text-xs md:text-sm"
							>
								<FontAwesomeIcon
									icon={faRefresh}
									className="text-xs md:text-sm"
								/>
								{t('bulkUpload.progress.tryAgain')}
							</AOutlineButton>
						)}
						<AButton
							onClick={onGoToMyMemes}
							addClass="gap-1 md:gap-2 text-xs md:text-sm"
						>
							{t('bulkUpload.progress.goToMyMemes')}
						</AButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadProgressTracker;
