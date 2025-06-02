import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Path } from 'src/constants/type';
import { login } from 'src/service/login';
import { useBoundStore } from 'src/store/store';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import { setToken } from 'src/utils/token';
import { loginValidationSchema, LoginFormData } from './login.validation';
import { t } from 'i18next';

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
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginValidationSchema),
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<TInputs> = async (data) => {
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
			toast.success(t('login.success'));
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
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<AInput
					type="email"
					label={t('email')}
					rest={{ ...register('email'), disabled: isSubmitting }}
				/>
			</div>
			{errors.email?.message && (
				<p className="mt-2 text-red-500">{t(errors.email.message)}</p>
			)}
			<div>
				<AInput
					type="password"
					label={t('password')}
					rest={{ ...register('password'), disabled: isSubmitting }}
				/>
			</div>
			{errors.password?.message && (
				<p className="mt-2 text-red-500">{t(errors.password.message)}</p>
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
