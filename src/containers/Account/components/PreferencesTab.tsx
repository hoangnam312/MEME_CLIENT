import React from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import { useAuthen } from 'src/hooks/useAuthen';

interface PreferencesTabProps {
	onDeleteAccount: () => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ onDeleteAccount }) => {
	const { userId } = useAuthen();

	const handleDeleteAccount = async () => {
		try {
			// TODO: Replace with actual API call
			console.log('Delete account:', userId);
			onDeleteAccount();
		} catch (error) {
			toast.error(t('account.deleteError'));
		}
	};

	return (
		<div className="space-y-6">
			{/* Language Preference */}
			<div>
				<label className="mb-2 block text-sm font-medium text-gray-700">
					{t('account.language')}
				</label>
				<select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
					<option value="en">English</option>
					<option value="vi">Tiếng Việt</option>
				</select>
			</div>

			{/* Danger Zone */}
			<div className="rounded-lg border border-red-200 bg-red-50 p-4">
				<h3 className="mb-2 text-lg font-medium text-red-800">
					{t('account.dangerZone')}
				</h3>
				<p className="mb-4 text-sm text-red-700">
					{t('account.deleteWarning')}
				</p>
				<AButton
					content={t('account.deleteAccount')}
					addClass="!bg-red-600 hover:!bg-red-700 text-white"
					onClick={handleDeleteAccount}
				/>
			</div>
		</div>
	);
};

export default PreferencesTab;
