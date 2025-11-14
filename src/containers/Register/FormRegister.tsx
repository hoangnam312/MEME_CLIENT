import { t } from 'i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from './register.validation';

import { Path } from 'src/constants/type';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import { register as registerService } from 'src/service/auth';

function FormRegister() {
	const navigate = useNavigate();

	type TInputs = {
		email: string;
		username: string;
		password: string;
		confirmPassword: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TInputs>({
		resolver: yupResolver(registerValidationSchema),
		mode: 'onChange',
	});

	const handleRegister: SubmitHandler<TInputs> = async (data) => {
		const { email, password, username } = data;

		try {
			await registerService({
				email,
				username,
				password,
			});
			toast.success(t('register.success'));
			// Navigate to email verification page with the registered email
			navigate(Path.VERIFY_EMAIL, { state: { email } });
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(t('toast.unexpectedError'));
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(handleRegister)}>
			<AInput
				addClassWrapper="mt-3"
				addClassLabel="dark:text-violet-900"
				label={t('email')}
				rest={{ ...register('email'), name: 'email' }}
			/>
			{errors.email?.message && (
				<p className="mt-2 text-red-500">{t(errors.email.message)}</p>
			)}
			<AInput
				addClassWrapper="mt-3"
				addClassLabel="dark:text-violet-900"
				label={t('username')}
				rest={{ ...register('username'), name: 'username' }}
			/>
			{errors.username?.message && (
				<p className="mt-2 text-red-500">{t(errors.username.message)}</p>
			)}
			<AInput
				addClassWrapper="mt-3"
				addClassLabel="dark:text-violet-900"
				label={t('password')}
				type="password"
				rest={{ ...register('password') }}
			/>
			{errors.password?.message && (
				<p className="mt-2 text-red-500">{t(errors.password.message)}</p>
			)}
			<AInput
				addClassWrapper="mt-3"
				addClassLabel="dark:text-violet-900"
				label={t('confirmPassword')}
				type="password"
				rest={{ ...register('confirmPassword') }}
			/>
			{errors.confirmPassword?.message && (
				<p className="mt-2 text-red-500">{t(errors.confirmPassword.message)}</p>
			)}
			<div className="mt-7 flex justify-center align-middle">
				<AButton
					content={t('register')}
					onClick={handleSubmit(handleRegister)}
					rest={{
						type: 'submit',
					}}
				/>
			</div>
		</form>
	);
}

export default FormRegister;
