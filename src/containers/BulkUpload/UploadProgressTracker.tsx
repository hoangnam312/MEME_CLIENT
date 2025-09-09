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
		<div className="rounded-xl bg-white p-6 shadow-sm">
			<div className="mb-6">
				<h2 className="mb-4 text-2xl font-semibold text-gray-900">
					{isComplete
						? t('bulkUpload.progress.uploadComplete')
						: hasError
						? t('bulkUpload.progress.uploadFailed')
						: t('bulkUpload.progress.uploadingMemes')}
				</h2>

				{isProcessing && (
					<div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
						<div className="flex items-center gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.progress')}
							</span>
							<span className="font-semibold text-gray-900">
								{progress.processedFiles} / {progress.totalFiles}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.success')}
							</span>
							<span className="font-semibold text-green-600">
								{progress.successCount}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-gray-600">
								{t('bulkUpload.progress.failed')}
							</span>
							<span className="font-semibold text-red-600">
								{progress.failedCount}
							</span>
						</div>
						<div className="flex items-center gap-2">
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

			<div className="mb-6">
				<div className="relative h-6 overflow-hidden rounded-full bg-gray-200">
					<div
						className="flex h-full items-center justify-center bg-gradient-to-r from-violet-300 to-violet-900 transition-all duration-500 ease-out"
						style={{ width: `${progress.percentage}%` }}
					>
						{progress.percentage > 15 && (
							<span className="text-sm font-semibold text-white">
								{progress.percentage}%
							</span>
						)}
					</div>
					{progress.percentage <= 15 && (
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-sm font-semibold text-gray-700">
								{progress.percentage}%
							</span>
						</div>
					)}
				</div>
			</div>

			{isProcessing && progress.currentFile && (
				<div className="mb-6 flex items-center gap-3 rounded-lg bg-gray-50 p-4">
					<FontAwesomeIcon icon={faSpinner} className="text-violet-900" spin />
					<span className="text-gray-700">{progress.currentFile}</span>
				</div>
			)}

			<div className="mt-8">
				<div className="py-12 text-center text-gray-500">
					{isProcessing ? (
						<>
							<FontAwesomeIcon
								icon={faHourglassHalf}
								spin
								className="mb-4 text-4xl text-emerald-300"
							/>
							<p className="mb-2 text-lg font-medium">
								{t('bulkUpload.progress.processingMemes')}
							</p>
							<p className="text-sm">
								{t('bulkUpload.progress.processingDescription')}
							</p>
						</>
					) : (
						<p>{t('bulkUpload.progress.noResultsYet')}</p>
					)}
				</div>
			</div>

			{(isComplete || hasError) && (
				<div className="mt-8 border-t border-gray-200 pt-8">
					{isComplete && (
						<div className="mb-6 flex items-start gap-4">
							<FontAwesomeIcon
								icon={faCheckCircle}
								className="mt-1 text-3xl text-green-500"
							/>
							<div className="flex-1">
								<h3 className="mb-2 text-xl font-semibold text-gray-900">
									{t('bulkUpload.progress.successfullyUploaded', {
										successCount: progress.successCount,
										totalFiles: progress.totalFiles,
									})}
								</h3>
								{progress.failedCount > 0 && (
									<p className="mb-1 text-amber-600">
										{t('bulkUpload.progress.filesFailedToUpload', {
											failedCount: progress.failedCount,
											plural: progress.failedCount !== 1 ? 's' : '',
										})}
									</p>
								)}
								<p className="text-sm text-gray-500">
									{t('bulkUpload.progress.totalTime', {
										time: formatTime(progress.elapsedTime),
									})}
								</p>
							</div>
						</div>
					)}

					{hasError && (
						<div className="mb-6 flex items-start gap-4">
							<FontAwesomeIcon
								icon={faExclamationTriangle}
								className="mt-1 text-3xl text-red-500"
							/>
							<div className="flex-1">
								<h3 className="mb-2 text-xl font-semibold text-gray-900">
									{t('bulkUpload.progress.uploadProcessError')}
								</h3>
								<p className="text-gray-600">
									{t('bulkUpload.progress.tryAgainMessage')}
								</p>
							</div>
						</div>
					)}

					<div className="flex justify-center gap-3">
						{(hasError || progress.failedCount > 0) && (
							<AOutlineButton onClick={onRetry} addClass="gap-2">
								<FontAwesomeIcon icon={faRefresh} />
								{t('bulkUpload.progress.tryAgain')}
							</AOutlineButton>
						)}
						<AButton onClick={onGoToMyMemes} addClass="gap-2">
							{t('bulkUpload.progress.goToMyMemes')}
						</AButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default UploadProgressTracker;
