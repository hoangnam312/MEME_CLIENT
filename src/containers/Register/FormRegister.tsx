import { t } from 'i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Path } from 'src/constants/type';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import { register as registerService } from 'src/service/login';

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
	} = useForm<TInputs>();

	const handleRegister: SubmitHandler<TInputs> = async (data) => {
		const { email, password, confirmPassword, username } = data;

		if (password !== confirmPassword)
			return toast.error(t('validate.dontSamePassword'));

		try {
			await registerService({
				email,
				username,
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

	return (
		<form onSubmit={handleSubmit(handleRegister)}>
			<AInput
				addClassWrapper="mt-3"
				name="email"
				label={t('email')}
				rest={{ ...register('email', { required: true }) }}
			/>
			{errors.email && (
				<p className="mt-2 text-red-500">{t('validate.requiredField')}</p>
			)}
			<AInput
				addClassWrapper="mt-3"
				name="username"
				label={t('username')}
				rest={{ ...register('username', { required: true }) }}
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
			<AInput
				addClassWrapper="mt-3"
				label={t('confirmPassword')}
				type="password"
				rest={{ ...register('confirmPassword', { required: true }) }}
			/>
			{errors.confirmPassword && (
				<p className="mt-2 text-red-500">{t('validate.requiredField')}</p>
			)}
			<div className="mt-7 flex justify-center align-middle">
				<AButton
					type="submit"
					content={t('login')}
					onClick={handleSubmit(handleRegister)}
				/>
			</div>
		</form>
	);
}

export default FormRegister;
