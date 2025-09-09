import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { UPLOAD_CONFIG } from '../../../constants/BulkUpload';

export const useFileValidation = () => {
	const validateFile = useCallback((file: File): boolean => {
		if (!file.type.startsWith('image/')) {
			toast.error(t('bulkUpload.errors.notImage', { fileName: file.name }));
			return false;
		}

		if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
			toast.error(t('bulkUpload.errors.exceedsSize', { fileName: file.name }));
			return false;
		}

		return true;
	}, []);

	return { validateFile };
};
