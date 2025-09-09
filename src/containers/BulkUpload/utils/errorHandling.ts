import { BulkErrorResponse, ApiError } from '../types';

export interface NetworkError {
	response?: {
		data?: BulkErrorResponse;
		status?: number;
	};
	message?: string;
}

export const isNetworkError = (error: unknown): error is NetworkError => {
	return typeof error === 'object' && error !== null && 'response' in error;
};

export const extractErrorMessage = (
	error: unknown,
	fallbackMessage: string
): string => {
	if (error instanceof Error) {
		return error.message;
	}

	if (isNetworkError(error)) {
		return error.response?.data?.message || error.message || fallbackMessage;
	}

	if (typeof error === 'object' && error !== null) {
		const bulkError = error as BulkErrorResponse;
		return bulkError.message || fallbackMessage;
	}

	return fallbackMessage;
};

export const extractValidationErrors = (error: unknown): ApiError[] => {
	if (isNetworkError(error)) {
		const validationErrors = error.response?.data?.validationErrors;
		if (validationErrors) {
			return validationErrors.map((err) => ({
				code: 'VALIDATION_ERROR',
				message: err.message,
				details: { field: err.field, index: err.index },
			}));
		}
	}

	return [];
};
