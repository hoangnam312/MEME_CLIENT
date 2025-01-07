import { t } from 'i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Path } from 'src/constants/type';
import { login } from 'src/service/login';
import { useBoundStore } from 'src/store/store';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import { setToken } from 'src/utils/token';

type TInputs = {
	email: string;
	password: string;
};

function FormLogin() {
	const navigate = useNavigate();
	const { updateAuthen } = useBoundStore((state) => state.authen);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TInputs>();

	const handleLogin: SubmitHandler<TInputs> = async (data) => {
		const { email, password } = data;
		try {
			await login({
				email,
				password,
			}).then((res) => {
				const newAuthen = {
					email: res.data.email,
					username: res.data.username,
					userId: res.data.userId,
					...res.data.authentication,
				};
				setToken(newAuthen.token);
				localStorage.setItem('authen', JSON.stringify(newAuthen));
				updateAuthen(newAuthen);
			});
			navigate(Path.HOME_PAGE);
		} catch (error) {
			localStorage.removeItem('authen');
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data);
			} else {
				toast.error(t('toast.unexpectedError'));
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(handleLogin)}>
			<AInput
				addClassWrapper="mt-3"
				label={t('email')}
				rest={{ ...register('email', { required: true }), name: 'email' }}
			/>
			{errors.email && (
				<p className="mt-2 text-red-500">{t('validate.requiredField')}</p>
			)}
			<AInput
				addClassWrapper="mt-3"
				label={t('password')}
				type="password"
				rest={{ ...register('password', { required: true }) }}
			/>
			{errors.password && (
				<p className="mt-2 text-red-500">{t('validate.requiredField')}</p>
			)}
			<div className="mt-7 flex justify-center align-middle">
				<AButton
					content={t('login')}
					rest={{
						type: 'submit',
					}}
				/>
			</div>
		</form>
	);
}

export default FormLogin;
