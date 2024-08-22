import { useState } from 'react';

import { t } from 'i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Path } from 'src/constants/type';
import { login } from 'src/service/login';

const useLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleLogin = async () => {
		try {
			await login({
				email,
				password,
			});
			navigate(Path.HOME_PAGE);
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data);
			} else {
				toast.error(t('toast.unexpectedError'));
			}
		}
	};

	return { email, changeEmail, password, changePassword, handleLogin };
};

export default useLogin;
