import { t } from 'i18next';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Path } from 'src/constants/type';
import { login } from 'src/service/login';
import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';

function FormLogin() {
	const navigate = useNavigate();

	type TInputs = {
		email: string;
		password: string;
	};

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
		<form onSubmit={handleSubmit(handleLogin)}>
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
				label={t('password')}
				type="password"
				rest={{ ...register('password', { required: true }) }}
			/>
			{errors.password && (
				<p className="mt-2 text-red-500">{t('validate.requiredField')}</p>
			)}
			<div className="mt-7 flex justify-center align-middle">
				<AButton
					type="submit"
					content={t('login')}
					onClick={handleSubmit(handleLogin)}
				/>
			</div>
		</form>
	);
}

export default FormLogin;
