import React from 'react';
import { t } from 'i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import { changePassword } from 'src/service/user';
import { useAuthen } from 'src/hooks/useAuthen';
import {
	accountValidationSchema,
	PasswordFormData,
} from '../account.validation';

const PasswordTab: React.FC = () => {
	const { logout } = useAuthen();

	// Password form
	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
		reset: resetPassword,
	} = useForm<PasswordFormData>({
		resolver: yupResolver(accountValidationSchema.password),
	});

	const onSubmitPassword: SubmitHandler<PasswordFormData> = async (data) => {
		try {
			const response = await changePassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
			});

			// Clear form fields after successful password update
			resetPassword();

			// Show success message
			toast.success(
				response.data.message || t('account.password.updateSuccess')
			);

			// Log out user and redirect to login page for security
			setTimeout(() => {
				logout();
			}, 2000); // Give user time to see the success message
		} catch (error: unknown) {
			// Handle API error responses
			if (error && typeof error === 'object' && 'response' in error) {
				const apiError = error as { response: { data: { message: string } } };
				toast.error(
					apiError.response?.data?.message || t('account.password.updateError')
				);
			} else {
				toast.error(t('account.password.updateError'));
			}
		}
	};

	return (
		<div className="space-y-4 md:space-y-6">
			<div className="rounded-lg bg-yellow-50 p-3 md:p-4 dark:bg-yellow-900/20">
				<p className="text-xs text-yellow-800 md:text-sm dark:text-yellow-300">
					{t('account.password.help')}
				</p>
			</div>

			<form
				onSubmit={handleSubmitPassword(onSubmitPassword)}
				className="space-y-3 md:space-y-4"
			>
				<div>
					<AInput
						type="password"
						label={t('account.currentPassword')}
						rest={{
							...registerPassword('currentPassword'),
							disabled: isSubmittingPassword,
						}}
					/>
					{passwordErrors.currentPassword?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(passwordErrors.currentPassword.message)}
						</p>
					)}
				</div>

				<div>
					<AInput
						type="password"
						label={t('account.newPassword')}
						rest={{
							...registerPassword('newPassword'),
							disabled: isSubmittingPassword,
						}}
					/>
					{passwordErrors.newPassword?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(passwordErrors.newPassword.message)}
						</p>
					)}
				</div>

				<div>
					<AInput
						type="password"
						label={t('confirmPassword')}
						rest={{
							...registerPassword('confirmPassword'),
							disabled: isSubmittingPassword,
						}}
					/>
					{passwordErrors.confirmPassword?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(passwordErrors.confirmPassword.message)}
						</p>
					)}
				</div>

				<div className="flex justify-end">
					<AButton
						content={t('account.updatePassword')}
						rest={{
							type: 'submit',
							disabled: isSubmittingPassword,
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default PasswordTab;
