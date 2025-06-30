import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';

import { useAuthen } from 'src/hooks/useAuthen';
import AButton from 'src/component/atoms/AButton/AButton';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import AModal from 'src/component/atoms/AModal/AModal';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import ProfileTab from './components/ProfileTab';
import PasswordTab from './components/PasswordTab';
import PreferencesTab from './components/PreferencesTab';
import FollowersTab from './components/FollowersTab';
import FollowingTab from './components/FollowingTab';

interface UserCounts {
	followersCount: number;
	followingCount: number;
}

const Account: React.FC = () => {
	const { logout, userId } = useAuthen();
	const [activeTab, setActiveTab] = useState('profile');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userCounts, setUserCounts] = useState<UserCounts>({
		followersCount: 0,
		followingCount: 0,
	});
	const [isLoadingCounts, setIsLoadingCounts] = useState(true);

	// Fetch user counts on component mount
	useEffect(() => {
		const fetchUserCounts = async () => {
			setIsLoadingCounts(true);
			try {
				// TODO: Replace with actual API call
				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Mock data - replace with actual API response
				const mockCounts = {
					followersCount: 4, // Number of mock followers
					followingCount: 5, // Number of mock following
				};

				setUserCounts(mockCounts);
			} catch (error) {
				console.error('Error fetching user counts:', error);
				// Set default counts on error
				setUserCounts({ followersCount: 0, followingCount: 0 });
			} finally {
				setIsLoadingCounts(false);
			}
		};

		if (userId) {
			fetchUserCounts();
		}
	}, [userId]);

	const tabs = [
		{ key: 'profile', label: t('account.profile') },
		{ key: 'password', label: t('account.password') },
		{ key: 'preferences', label: t('account.preferences') },
		{
			key: 'followers',
			label: isLoadingCounts
				? `${t('followers')} (...)`
				: `${t('followers')} (${userCounts.followersCount})`,
		},
		{
			key: 'following',
			label: isLoadingCounts
				? `${t('following')} (...)`
				: `${t('following')} (${userCounts.followingCount})`,
		},
	];

	const handleDeleteAccount = async () => {
		try {
			toast.success(t('account.deleteSuccess'));
			logout();
		} catch (error) {
			toast.error(t('account.deleteError'));
		}
		setShowDeleteModal(false);
	};

	// Function to update counts when users are removed/unfollowed
	const updateFollowersCount = (newCount: number) => {
		setUserCounts((prev) => ({ ...prev, followersCount: newCount }));
	};

	const updateFollowingCount = (newCount: number) => {
		setUserCounts((prev) => ({ ...prev, followingCount: newCount }));
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case 'profile':
				return <ProfileTab />;
			case 'password':
				return <PasswordTab />;
			case 'preferences':
				return (
					<PreferencesTab onDeleteAccount={() => setShowDeleteModal(true)} />
				);
			case 'followers':
				return <FollowersTab onCountUpdate={updateFollowersCount} />;
			case 'following':
				return <FollowingTab onCountUpdate={updateFollowingCount} />;
			default:
				return <ProfileTab />;
		}
	};

	return (
		<OModalRequiredAuthen>
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900">
							{t('account.title')}
						</h1>
						<p className="mt-2 text-gray-600">{t('account.subtitle')}</p>
					</div>

					{/* Main Content */}
					<div className="rounded-lg bg-white shadow">
						{/* Tabs */}
						<div className="pt-2">
							<ATabs
								tabs={tabs}
								value={activeTab}
								onChange={setActiveTab}
								addClass="!w-full"
							/>
						</div>

						{/* Tab Content */}
						<div className="px-6 py-8">{renderTabContent()}</div>
					</div>
				</div>
			</div>

			{/* Delete Account Modal */}
			<AModal
				isOpen={showDeleteModal}
				closeModal={() => setShowDeleteModal(false)}
			>
				<div className="space-y-4">
					<h2 className="text-xl font-bold">{t('account.deleteAccount')}</h2>
					<p className="text-gray-600">{t('account.deleteConfirmation')}</p>
					<div className="flex justify-end space-x-3">
						<AButton
							content={t('cancel')}
							addClass="!bg-gray-500 hover:!bg-gray-600"
							onClick={() => setShowDeleteModal(false)}
						/>
						<AButton
							content={t('account.confirmDelete')}
							addClass="!bg-red-600 hover:!bg-red-700"
							onClick={handleDeleteAccount}
						/>
					</div>
				</div>
			</AModal>
		</OModalRequiredAuthen>
	);
};

export default Account;
