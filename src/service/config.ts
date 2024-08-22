import axios, { AxiosError } from 'axios';
import { Path } from 'src/constants/type';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL: baseURL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

api.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		const status = error.response?.status;

		if (status) {
			switch (status) {
				case 401:
					window.location.href = Path.LOGIN;
					break;
				case 500:
					window.location.href = Path.SERVER_ERROR;
					break;
			}
		}
		return Promise.reject(error);
	}
);

export default api;
