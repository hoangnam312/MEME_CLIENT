import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { BulkUploadProgress, SSEProgressTracker } from 'src/service/bulkMeme';
import { UploadState } from '../types';

export const useSSEHandlers = () => {
	const setupSSEHandlers = useCallback(
		(
			sseTracker: SSEProgressTracker,
			setUploadState: React.Dispatch<React.SetStateAction<UploadState>>
		) => {
			sseTracker.setProgressHandler((data: BulkUploadProgress) => {
				setUploadState((prev) => ({
					...prev,
					progress: data,
					results: data.allResults || prev.results,
				}));
			});

			sseTracker.setCompleteHandler(() => {
				setUploadState((prev) => ({
					...prev,
					isUploading: false,
				}));
			});

			sseTracker.setErrorHandler((error: Error) => {
				toast.error(t('bulkUpload.errors.trackingLost'));
				console.error('SSE Error:', error);
			});
		},
		[]
	);

	return { setupSSEHandlers };
};
