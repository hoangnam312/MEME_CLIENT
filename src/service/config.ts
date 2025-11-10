import axios, { AxiosError } from 'axios';
import { Path } from 'src/constants/type';
import { clearToken, getToken } from 'src/utils/token';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL: baseURL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	// Add user's preferred language to Accept-Language header
	try {
		const authen = JSON.parse(localStorage.getItem('authen') ?? '{}');
		if (authen.preferences?.contentLanguage) {
			// Send user's preferred language with high priority
			config.headers[
				'Accept-Language'
			] = `${authen.preferences.contentLanguage},en;q=0.8`;
		} else {
			// Fallback to browser's default language detection
			// Browser will automatically send Accept-Language header
			// but we can enhance it with our supported languages
			const browserLang = navigator.language.split('-')[0];
			if (['en', 'vi'].includes(browserLang)) {
				config.headers['Accept-Language'] = `${browserLang},en;q=0.8`;
			} else {
				config.headers['Accept-Language'] = 'en';
			}
		}
	} catch (error) {
		// If there's any error parsing localStorage, fallback to English
		config.headers['Accept-Language'] = 'en';
	}

	return config;
});

api.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		const status = error.response?.status;

		if (status) {
			switch (status) {
				case 401:
					window.location.href = Path.LOGIN;
					clearToken();
					break;
				case 503:
					window.location.href = Path.SERVER_ERROR;
					break;
			}
		}
		return Promise.reject(error);
	}
);

export default api;
