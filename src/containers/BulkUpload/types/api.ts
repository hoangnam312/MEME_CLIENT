// API Response Types based on server implementation

export interface ErrorDetails {
	field?: string;
	index?: number;
	fileName?: string;
	fileSize?: number;
	maxSize?: number;
	allowedTypes?: string[];
	[key: string]: unknown;
}

export interface ApiError {
	code: string;
	message: string;
	details?: ErrorDetails;
}

export interface MemeUploadResult {
	index: number;
	status: 'success' | 'failed';
	memeId?: string;
	name?: string;
	imageUrl?: string;
	error?: ApiError;
}

export interface BulkUploadResponse {
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

export interface BulkValidationError {
	index: number;
	field: string;
	message: string;
}

export interface ServerError {
	code?: string;
	message?: string;
	stack?: string;
	name?: string;
	details?: ErrorDetails;
}

export interface BulkErrorResponse {
	message: string;
	validationErrors?: BulkValidationError[];
	error?: ServerError;
}

export interface BulkUploadStatusResponse {
	uploadId: string;
	type: 'progress' | 'completed' | 'error';
	totalFiles: number;
	processedFiles: number;
	successCount: number;
	failedCount: number;
	currentFile: string;
	estimatedTimeRemaining: number;
	elapsedTime: number;
	percentage: number;
	status: 'processing' | 'completed' | 'error';
	recentResults?: MemeUploadResult[];
	allResults?: MemeUploadResult[];
}

// SSE Event Types
export interface SSEProgressEvent {
	type: 'progress';
	uploadId: string;
	totalFiles: number;
	processedFiles: number;
	successCount: number;
	failedCount: number;
	currentFile: string;
	estimatedTimeRemaining: number;
	elapsedTime: number;
	percentage: number;
	recentResults: MemeUploadResult[];
	status: 'processing' | 'completed' | 'error';
}

export interface SSECompletedEvent {
	type: 'completed';
	uploadId: string;
	totalFiles: number;
	processedFiles: number;
	successCount: number;
	failedCount: number;
	currentFile: string;
	estimatedTimeRemaining: number;
	elapsedTime: number;
	percentage: number;
	status: 'completed';
	allResults: MemeUploadResult[];
}

export interface SSEConnectedEvent {
	type: 'connected';
	uploadId: string;
}

export type SSEEvent = SSEProgressEvent | SSECompletedEvent | SSEConnectedEvent;
