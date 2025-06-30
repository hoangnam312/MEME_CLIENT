import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { resetPassword } from 'src/service/auth';
import {
	resetPasswordValidationSchema,
	ResetPasswordFormData,
} from '../forgotPassword.validation';
import { StepProps } from '../forgotPassword.types';

const ResetPasswordStep: React.FC<StepProps> = ({ state, onNext }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<ResetPasswordFormData>({
		resolver: yupResolver(resetPasswordValidationSchema),
		mode: 'onChange',
	});

	const newPassword = watch('newPassword');

	const onSubmit = async (data: ResetPasswordFormData) => {
		try {
			await resetPassword({
				email: state.email,
				code: state.code,
				newPassword: data.newPassword,
			});

			onNext({ step: 'SUCCESS' });
			toast.success(t('forgotPassword.messages.passwordResetSuccess'));
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage = error.response.data?.error || error.response.data;
				if (
					errorMessage.includes('invalid') ||
					errorMessage.includes('expired')
				) {
					toast.error(t('forgotPassword.messages.codeExpired'));
					// Go back to email step to restart the process
					onNext({
						step: 'EMAIL',
						code: '',
						attempts: 0,
						timer: 0,
						canResend: false,
					});
				} else {
					toast.error(errorMessage);
				}
			} else {
				toast.error(t('forgotPassword.messages.unexpectedError'));
			}
		}
	};

	const handleBackToCode = () => {
		onNext({
			step: 'CODE_VERIFICATION',
		});
	};

	return (
		<div className="space-y-20">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-900">
					{t('forgotPassword.resetStep.title')}
				</h2>
				<p className="mt-2 text-gray-600">
					{t('forgotPassword.resetStep.subtitle')}
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<AInput
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

				{/* Password strength indicator */}
				{newPassword && (
					<div className="text-sm text-gray-600">
						<p>{t('forgotPassword.resetStep.passwordHint')}</p>
						<div className="mt-1 flex space-x-1">
							<div
								className={`h-1 w-full rounded ${
									newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'
								}`}
							/>
							<div
								className={`h-1 w-full rounded ${
									newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
								}`}
							/>
							<div
								className={`h-1 w-full rounded ${
									/(?=.*[a-z])(?=.*[A-Z])/.test(newPassword)
										? 'bg-green-500'
										: 'bg-gray-300'
								}`}
							/>
							<div
								className={`h-1 w-full rounded ${
									/(?=.*\d)/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'
								}`}
							/>
						</div>
					</div>
				)}

				<div className="flex justify-center space-y-3">
					<AButton
						content={t('forgotPassword.resetStep.resetButton')}
						rest={{
							type: 'submit',
							disabled: isSubmitting,
						}}
					/>
				</div>
			</form>

			<div className="text-center">
				<AOutlineButton
					onClick={handleBackToCode}
					addClass="text-sm"
					rest={{ disabled: isSubmitting }}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					<span className="ml-1 inline-block">{t('getBack')}</span>
				</AOutlineButton>
			</div>
		</div>
	);
};

export default ResetPasswordStep;
