import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { resetPassword } from 'src/service/auth';

interface ResetPasswordFormData {
	newPassword: string;
	confirmPassword: string;
}

const resetPasswordValidationSchema = yup.object().shape({
	newPassword: yup
		.string()
		.required('validate.requiredField')
		.min(6, 'validate.passwordMinLength')
		.max(128, 'validate.passwordMaxLength'),
	confirmPassword: yup
		.string()
		.required('validate.requiredField')
		.oneOf([yup.ref('newPassword')], 'validate.passwordsMustMatch'),
});

interface NewResetPasswordProps {
	email: string;
	code: string;
	onSuccess: () => void;
	onBack: () => void;
}

const NewResetPassword: React.FC<NewResetPasswordProps> = ({
	email,
	code,
	onSuccess,
	onBack,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordFormData>({
		resolver: yupResolver(resetPasswordValidationSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			const response = await resetPassword({
				email,
				code,
				newPassword: data.newPassword,
			});

			const result = response.data;
			toast.success(
				result.message || t('forgotPassword.messages.passwordResetSuccess')
			);
			onSuccess();
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage =
					error.response.data?.message || error.response.data;

				if (
					errorMessage.includes('invalid') ||
					errorMessage.includes('expired')
				) {
					toast.error(t('forgotPassword.messages.codeExpired'));
					// Go back to email step to restart the process
					onBack();
				} else {
					toast.error(errorMessage);
				}
			} else {
				toast.error(t('forgotPassword.messages.unexpectedError'));
			}
		}
	};

	return (
		<>
			<div className="mb-5 space-y-8 rounded-lg bg-white px-5 py-7 shadow">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900">
						{t('forgotPassword.resetStep.title')}
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{t('forgotPassword.resetStep.subtitle')}
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="space-y-6 py-12">
						<div>
							<AInput
								addClassLabel="dark:text-violet-900"
								type="password"
								label={t('forgotPassword.resetStep.newPasswordLabel')}
								rest={{
									...register('newPassword'),
									disabled: isSubmitting,
									autoFocus: true,
								}}
							/>
							{errors.newPassword?.message && (
								<p className="mt-2 text-sm text-red-500">
									{t(errors.newPassword.message)}
								</p>
							)}
						</div>

						<div>
							<AInput
								addClassLabel="dark:text-violet-900"
								type="password"
								label={t('forgotPassword.resetStep.confirmPasswordLabel')}
								rest={{
									...register('confirmPassword'),
									disabled: isSubmitting,
								}}
							/>
							{errors.confirmPassword?.message && (
								<p className="mt-2 text-sm text-red-500">
									{t(errors.confirmPassword.message)}
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-center">
						<AButton isDisabled={isSubmitting}>
							{isSubmitting
								? t('updating')
								: t('forgotPassword.resetStep.resetButton')}
						</AButton>
					</div>
				</form>
			</div>
			<div className="text-center">
				<AOutlineButton
					onClick={onBack}
					addClass="text-sm"
					isDisabled={isSubmitting}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					<span className="ml-2">{t('getBack')}</span>
				</AOutlineButton>
			</div>
		</>
	);
};

export default NewResetPassword;
