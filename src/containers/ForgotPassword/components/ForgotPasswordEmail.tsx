import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { Path } from 'src/constants/type';
import { forgotPassword } from 'src/service/auth';
import {
	EmailFormData,
	emailValidationSchema,
} from '../forgotPassword.validation';

interface ForgotPasswordEmailProps {
	onNext: (data: {
		email: string;
		expiresAt: string;
		canResendAt?: string;
	}) => void;
}

const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
	onNext,
}) => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailFormData>({
		resolver: yupResolver(emailValidationSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: EmailFormData) => {
		try {
			const response = await forgotPassword({ email: data.email });
			const result = response.data;

			onNext({
				email: data.email,
				expiresAt: result.expiresAt,
				canResendAt: result.canResendAt,
			});

			toast.success(result.message || t('forgotPassword.messages.codeSent'));
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage =
					error.response.data?.message || error.response.data;

				if (error.response.status === 429) {
					toast.error(errorMessage);
				} else {
					// For security, we show success message even if email doesn't exist
					toast.success(t('forgotPassword.messages.codeSent'));
					onNext({
						email: data.email,
						expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
					});
				}
			} else {
				toast.error(t('forgotPassword.messages.unexpectedError'));
			}
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-10">
				<div className="space-y-8 rounded-lg bg-white px-5 py-7 shadow">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900">
							{t('forgotPassword.emailStep.title')}
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							{t('forgotPassword.emailStep.subtitle')}
						</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="py-12">
							<AInput
								type="email"
								label={t('forgotPassword.emailStep.emailLabel')}
								rest={{
									...register('email'),
									disabled: isSubmitting,
									autoFocus: true,
									placeholder: t('email'),
								}}
							/>
							{errors.email?.message && (
								<p className="mt-2 text-sm text-red-500">
									{t(errors.email.message)}
								</p>
							)}
						</div>

						<div className="flex justify-center">
							<AButton isDisabled={isSubmitting}>
								{isSubmitting
									? t('loading')
									: t('forgotPassword.emailStep.sendButton')}
							</AButton>
						</div>
					</form>
				</div>
				<div className="text-center">
					<AOutlineButton
						onClick={() => navigate(Path.LOGIN)}
						addClass="text-sm"
					>
						<FontAwesomeIcon icon={faArrowLeft} />
						<span className="ml-2">{t('forgotPassword.getBackToLogin')}</span>
					</AOutlineButton>
				</div>
			</div>
		</div>
	);
};

export default ForgotPasswordEmail;
