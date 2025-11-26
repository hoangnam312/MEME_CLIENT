import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Path } from 'src/constants/type';
import { login } from 'src/service/auth';
import { useBoundStore } from 'src/store/store';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import { setToken } from 'src/utils/token';
import { initializeLanguage } from 'src/utils/languageUtils';
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
			}).then(async (res) => {
				const newAuthen = {
					...res.data,
					userId: res.data._id,
					token: res.data.authentication.token,
					authentication: undefined,
				};
				setToken(newAuthen.token);
				localStorage.setItem('authen', JSON.stringify(newAuthen));
				updateAuthen(newAuthen);

				// Initialize language based on user preferences
				await initializeLanguage(res.data.preferences);
			});
			navigate(Path.HOME_PAGE);
		} catch (error) {
			localStorage.removeItem('authen');
			if (error instanceof AxiosError && error.response) {
				const errorData = error.response.data;
				// Check if email verification is required
				if (errorData.requiresVerification && errorData.email) {
					toast.error(errorData.message);
					// Redirect to email verification page with the email
					navigate(Path.VERIFY_EMAIL, {
						state: { email: errorData.email },
					});
				} else {
					toast.error(errorData.message || errorData);
				}
			} else {
				toast.error(t('toast.unexpectedError'));
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
			<div>
				<AInput
					addClassLabel="dark:text-violet-900"
					type="email"
					label={t('email')}
					rest={{ ...register('email'), disabled: isSubmitting }}
				/>
			</div>
			{errors.email?.message && (
				<p className="mt-1 text-xs text-red-500 md:mt-2 md:text-sm">
					{t(errors.email.message)}
				</p>
			)}
			<div>
				<AInput
					addClassLabel="dark:text-violet-900"
					type="password"
					label={t('password')}
					rest={{ ...register('password'), disabled: isSubmitting }}
				/>
			</div>
			{errors.password?.message && (
				<p className="mt-1 text-xs text-red-500 md:mt-2 md:text-sm">
					{t(errors.password.message)}
				</p>
			)}
			<div className="mt-5 flex justify-center align-middle md:mt-7">
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
