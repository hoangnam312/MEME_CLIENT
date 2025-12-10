import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import i18next from 'i18next';

import AButton from 'src/component/atoms/AButton/AButton';
import AConfirmModal from 'src/component/atoms/AConfirmModal/AConfirmModal';
import { useAuthen } from 'src/hooks/useAuthen';
import { updatePreferences, deleteAccount } from 'src/service/user';
import { useBoundStore } from 'src/store/store';

interface PreferencesTabProps {
	onDeleteAccount: () => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ onDeleteAccount }) => {
	const { preferences, logout } = useAuthen();
	const { updatePreferences: updatePreferencesStore } = useBoundStore(
		(state) => state.authen
	);

	const [currentLanguage, setCurrentLanguage] = useState<'en' | 'vi'>(
		preferences.contentLanguage as 'en' | 'vi'
	);
	const [enableWatermark, setEnableWatermark] = useState<boolean>(
		preferences.enableWatermark ?? true
	);
	const [isUpdatingPreferences, setIsUpdatingPreferences] = useState(false);
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
	const [isDeletingAccount, setIsDeletingAccount] = useState(false);

	// Sync current language with preferences
	useEffect(() => {
		setCurrentLanguage(preferences.contentLanguage as 'en' | 'vi');
	}, [preferences.contentLanguage]);

	// Sync watermark setting with preferences
	useEffect(() => {
		setEnableWatermark(preferences.enableWatermark ?? true);
	}, [preferences.enableWatermark]);

	const handleLanguageChange = async (newLanguage: 'en' | 'vi') => {
		if (newLanguage === currentLanguage) return;

		setIsUpdatingPreferences(true);
		try {
			// Update backend first
			await updatePreferences({ contentLanguage: newLanguage });

			// Update local state and store with the response data
			setCurrentLanguage(newLanguage);
			updatePreferencesStore({ contentLanguage: newLanguage });
			// Update localStorage with new preferences
			const authenRaw = localStorage.getItem('authen');
			if (authenRaw) {
				const authenObj = JSON.parse(authenRaw);
				authenObj.preferences = {
					...authenObj.preferences,
					contentLanguage: newLanguage,
				};
				localStorage.setItem('authen', JSON.stringify(authenObj));
			}
			// Update i18next
			await i18next.changeLanguage(newLanguage);

			toast.success(t('account.preferencesUpdateSuccess'));
		} catch (error: unknown) {
			// Handle different types of errors
			let errorMessage = t('account.preferencesUpdateError');

			if (error && typeof error === 'object' && 'response' in error) {
				const axiosError = error as {
					response?: { data?: { message?: string }; status?: number };
				};
				if (axiosError.response?.status === 401) {
					errorMessage = t('common.error.authRequired');
					logout(); // Logout if unauthorized
				} else if (axiosError.response?.data?.message) {
					errorMessage = axiosError.response.data.message;
				}
			} else if (error && typeof error === 'object' && 'message' in error) {
				// Network or other errors
				errorMessage = t('toast.unexpectedError');
			}

			toast.error(errorMessage);
			// Revert local state on error
			setCurrentLanguage(preferences.contentLanguage as 'en' | 'vi');
		} finally {
			setIsUpdatingPreferences(false);
		}
	};

	const handleWatermarkToggle = async (enabled: boolean) => {
		if (enabled === enableWatermark) return;

		setIsUpdatingPreferences(true);
		try {
			// Update backend first
			await updatePreferences({ enableWatermark: enabled });

			// Update local state and store
			setEnableWatermark(enabled);
			updatePreferencesStore({ enableWatermark: enabled });

			// Update localStorage with new preferences
			const authenRaw = localStorage.getItem('authen');
			if (authenRaw) {
				const authenObj = JSON.parse(authenRaw);
				authenObj.preferences = {
					...authenObj.preferences,
					enableWatermark: enabled,
				};
				localStorage.setItem('authen', JSON.stringify(authenObj));
			}

			// Show specific success message based on enabled/disabled state
			const successMessage = enabled
				? t('account.watermarkEnabled')
				: t('account.watermarkDisabled');
			toast.success(successMessage);
		} catch (error: unknown) {
			// Handle different types of errors
			let errorMessage = t('account.watermarkUpdateError');

			if (error && typeof error === 'object' && 'response' in error) {
				const axiosError = error as {
					response?: { data?: { message?: string }; status?: number };
				};
				if (axiosError.response?.status === 401) {
					errorMessage = t('common.error.authRequired');
					logout(); // Logout if unauthorized
				} else if (axiosError.response?.data?.message) {
					errorMessage = axiosError.response.data.message;
				}
			} else if (error && typeof error === 'object' && 'message' in error) {
				// Network or other errors
				errorMessage = t('toast.unexpectedError');
			}

			toast.error(errorMessage);
			// Revert local state on error
			setEnableWatermark(preferences.enableWatermark ?? true);
		} finally {
			setIsUpdatingPreferences(false);
		}
	};

	const handleDeleteAccount = async () => {
		setIsDeletingAccount(true);
		try {
			await deleteAccount();
			toast.success(t('account.deleteSuccess'));
			logout(); // Log out user after successful deletion
			onDeleteAccount();
		} catch (error: unknown) {
			toast.error(t('toast.unexpectedError'));
		} finally {
			setIsDeletingAccount(false);
			setIsConfirmDeleteOpen(false);
		}
	};

	return (
		<>
			<div className="space-y-6">
				{/* Language Preference */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						{t('account.language')}
					</label>
					<div className="relative">
						<select
							className={`w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
								isUpdatingPreferences ? 'cursor-not-allowed opacity-50' : ''
							}`}
							value={currentLanguage}
							onChange={(e) =>
								handleLanguageChange(e.target.value as 'en' | 'vi')
							}
							disabled={isUpdatingPreferences}
						>
							<option value="en">{t('language.en')}</option>
							<option value="vi">{t('language.vi')}</option>
						</select>
						{isUpdatingPreferences && (
							<div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
								<div className="h-4 w-4 animate-spin rounded-full border-b-2 border-indigo-500 dark:border-indigo-400"></div>
							</div>
						)}
					</div>
					{isUpdatingPreferences && (
						<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
							{t('updating')}
						</p>
					)}
				</div>

				{/* Watermark Preference */}
				<div>
					<label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						{t('account.watermark')}
					</label>
					<div className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-600 dark:bg-gray-700">
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-900 dark:text-white">
								{t('account.enableWatermark')}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{t('account.watermarkDescription')}
							</p>
						</div>
						<button
							type="button"
							onClick={() => handleWatermarkToggle(!enableWatermark)}
							disabled={isUpdatingPreferences}
							className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
								enableWatermark
									? 'bg-indigo-600 dark:bg-indigo-500'
									: 'bg-gray-200 dark:bg-gray-600'
							} ${
								isUpdatingPreferences ? 'cursor-not-allowed opacity-50' : ''
							}`}
							role="switch"
							aria-checked={enableWatermark}
						>
							<span
								className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
									enableWatermark ? 'translate-x-5' : 'translate-x-0'
								}`}
							/>
						</button>
					</div>
				</div>

				{/* Danger Zone */}
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
					<h3 className="mb-2 text-lg font-medium text-red-800 dark:text-red-400">
						{t('account.dangerZone')}
					</h3>
					<p className="mb-4 text-sm text-red-700 dark:text-red-300">
						{t('account.deleteWarning')}
					</p>
					<AButton
						content={t('account.deleteAccount')}
						addClass="!bg-red-600 hover:!bg-red-700 text-white dark:!bg-red-700 dark:hover:!bg-red-800"
						onClick={() => setIsConfirmDeleteOpen(true)}
						isDisabled={isDeletingAccount}
					/>
				</div>
			</div>

			{/* Delete Account Confirmation Modal */}
			<AConfirmModal
				isOpen={isConfirmDeleteOpen}
				onClose={() => setIsConfirmDeleteOpen(false)}
				onConfirm={handleDeleteAccount}
				title={t('account.deleteAccount')}
				message={t('account.deleteConfirmation')}
				confirmText={t('account.confirmDelete')}
				cancelText={t('cancel')}
				isDangerous={true}
				isLoading={isDeletingAccount}
			/>
		</>
	);
};

export default PreferencesTab;
