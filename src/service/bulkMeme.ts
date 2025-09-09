import api from './config';

export interface BulkMemeMetadata {
	name?: string;
	description?: string;
}

export interface MemeUploadResult {
	index: number;
	status: 'success' | 'failed';
	memeId?: string;
	name?: string;
	imageUrl?: string;
	error?: {
		code: string;
		message: string;
		details?: unknown;
	};
}

export interface BulkMemeUploadResponse {
	success: boolean;
	uploadId: string;
	totalFiles: number;
	estimatedDuration: number;
	progressEndpoint: string;
	message: string;
	successCount: number;
	failedCount: number;
	results: MemeUploadResult[];
	processingTime: number;
}

export interface BulkUploadProgress {
	type: 'progress' | 'completed' | 'error' | 'connected';
	uploadId: string;
	totalFiles: number;
	processedFiles: number;
	successCount: number;
	failedCount: number;
	currentFile: string;
	estimatedTimeRemaining: number;
	elapsedTime: number;
	percentage: number;
	recentResults?: MemeUploadResult[];
	allResults?: MemeUploadResult[];
	status: 'processing' | 'completed' | 'error';
}

export interface BulkUploadStatusResponse {
	uploadId: string;
	totalFiles: number;
	processedFiles: number;
	successCount: number;
	failedCount: number;
	currentFile: string;
	estimatedTimeRemaining: number;
	elapsedTime: number;
	percentage: number;
	status: 'processing' | 'completed' | 'error';
}

const createBulkMemes = (formData: FormData) =>
	api.post<BulkMemeUploadResponse>('/meme/bulk', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

const getBulkUploadStatus = (uploadId: string) =>
	api.get<BulkUploadStatusResponse>(`/meme/bulk/status/${uploadId}`);

class SSEProgressTracker {
	private eventSource: EventSource | null = null;
	private onProgress: ((data: BulkUploadProgress) => void) | null = null;
	private onError: ((error: Error) => void) | null = null;
	private onComplete: (() => void) | null = null;
	private isCompleted = false;

	connect(uploadId: string, baseURL: string) {
		const url = `${baseURL}meme/bulk/progress/${uploadId}`;

		this.disconnect();
		this.isCompleted = false;

		this.eventSource = new EventSource(url);

		this.eventSource.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data) as BulkUploadProgress;

				if (this.onProgress) {
					this.onProgress(data);
				}

				if (data.status === 'completed' || data.status === 'error') {
					this.isCompleted = true;
					if (this.onComplete) {
						this.onComplete();
					}
					setTimeout(() => this.disconnect(), 2000);
					this.disconnect();
				}
			} catch (error) {
				console.error('Error parsing SSE data:', error);
			}
		};

		this.eventSource.onerror = (error) => {
			console.error('SSE connection error:', error);
			// Only treat as error if upload hasn't completed normally
			if (!this.isCompleted && this.onError) {
				this.onError(new Error('Connection lost'));
			}
			this.disconnect();
		};

		this.eventSource.addEventListener('heartbeat', () => {
			console.log('SSE heartbeat received');
		});
	}

	setProgressHandler(handler: (data: BulkUploadProgress) => void) {
		this.onProgress = handler;
	}

	setErrorHandler(handler: (error: Error) => void) {
		this.onError = handler;
	}

	setCompleteHandler(handler: () => void) {
		this.onComplete = handler;
	}

	disconnect() {
		if (this.eventSource) {
			this.eventSource.close();
			this.eventSource = null;
		}
		this.isCompleted = false;
	}
}

export { createBulkMemes, getBulkUploadStatus, SSEProgressTracker };
