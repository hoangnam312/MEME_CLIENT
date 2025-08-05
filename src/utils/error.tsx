import { AxiosError } from 'axios';
import { t } from 'i18next';

export const getErrorFromAxiosError = (
	error: unknown,
	defaultMessage: string = t('toast.unexpectedError')
): string => {
	if (error instanceof AxiosError && error.response?.data?.message) {
		return error.response.data.message || defaultMessage;
	}
	return defaultMessage;
};
