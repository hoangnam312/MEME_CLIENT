import React, { useState, useCallback, useEffect } from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { useAuthen } from 'src/hooks/useAuthen';
import AButton from 'src/component/atoms/AButton/AButton';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import AModal from 'src/component/atoms/AModal/AModal';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import {
	getFollowers,
	getFollowing,
	transformFollowUserToUserCardData,
} from 'src/service/follow';
import { useBoundStore } from 'src/store/store';
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
	const { logout, stats, userId } = useAuthen();
	const [activeTab, setActiveTab] = useState('profile');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [userCounts, setUserCounts] = useState<UserCounts>({
		followersCount: stats.followersCount,
		followingCount: stats.followingCount,
	});

	// Get state from follow slice
	const {
		followers: followersState,
		following: followingState,
		setFollowers,
		setFollowing,
		setFollowersLoading,
		setFollowingLoading,
		setFollowersError,
		setFollowingError,
		setFollowersPagination,
		setFollowingPagination,
		batchSetFollowRelationships,
	} = useBoundStore((state) => state.follow);

	const tabs = [
		{ key: 'profile', label: t('account.profile') },
		{ key: 'password', label: t('account.password') },
		{ key: 'preferences', label: t('account.preferences') },
		{
			key: 'followers',
			label: `${t('followers')} (${userCounts.followersCount})`,
		},
		{
			key: 'following',
			label: `${t('following')} (${userCounts.followingCount})`,
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
	const updateFollowersCount = useCallback((newCount: number) => {
		setUserCounts((prev) => ({ ...prev, followersCount: newCount }));
	}, []);

	const updateFollowingCount = useCallback((newCount: number) => {
		setUserCounts((prev) => ({ ...prev, followingCount: newCount }));
	}, []);

	// Fetch followers function
	const fetchFollowers = useCallback(
		async (cursor?: string, reset = false) => {
			if (!userId) return;

			// Update loading states
			if (reset || !cursor) {
				setFollowersLoading(true, false);
			} else {
				setFollowersLoading(false, true);
			}

			setFollowersError(null);

			try {
				const response = await getFollowers(userId, {
					limit: 20,
					cursor: cursor,
				});

				const transformedUsers = response.data.data.map(
					transformFollowUserToUserCardData
				);

				// Update followers in store
				setFollowers(transformedUsers, reset || !cursor);

				// Update pagination info
				setFollowersPagination(
					response.data.hasNextPage,
					response.data.nextCursor,
					reset || !cursor
						? transformedUsers.length
						: followersState.totalCount + transformedUsers.length
				);

				// Update parent component with current total count
				const newTotalCount =
					reset || !cursor
						? transformedUsers.length
						: followersState.totalCount + transformedUsers.length;
				updateFollowersCount(newTotalCount);
			} catch (err) {
				const errorMessage =
					err instanceof AxiosError && err.response?.data?.message
						? err.response.data.message
						: t('account.followers.errorLoading');

				setFollowersError(errorMessage);
			} finally {
				setFollowersLoading(false, false);
			}
		},
		[
			userId,
			followersState.totalCount,
			setFollowers,
			setFollowersLoading,
			setFollowersError,
			setFollowersPagination,
			updateFollowersCount,
		]
	);

	// Fetch following function
	const fetchFollowing = useCallback(
		async (cursor?: string, reset = false) => {
			if (!userId) return;

			// Update loading states
			if (reset || !cursor) {
				setFollowingLoading(true, false);
			} else {
				setFollowingLoading(false, true);
			}

			setFollowingError(null);

			try {
				const response = await getFollowing(userId, {
					limit: 20,
					cursor: cursor,
				});

				const transformedUsers = response.data.data.map(
					transformFollowUserToUserCardData
				);

				// Update following in store
				setFollowing(transformedUsers, reset || !cursor);

				// Batch set follow relationships for all users in the following list
				const followRelationships: Record<
					string,
					{ isFollowing: boolean; isFollowedBy: boolean }
				> = {};
				transformedUsers.forEach((user) => {
					followRelationships[user.username] = {
						isFollowing: true, // Since these are users we're following
						isFollowedBy: false, // We don't have this info from the API response
					};
				});
				batchSetFollowRelationships(followRelationships);

				// Update pagination info
				setFollowingPagination(
					response.data.hasNextPage,
					response.data.nextCursor,
					reset || !cursor
						? transformedUsers.length
						: followingState.totalCount + transformedUsers.length
				);

				// Update parent component with current total count
				const newTotalCount =
					reset || !cursor
						? transformedUsers.length
						: followingState.totalCount + transformedUsers.length;
				updateFollowingCount(newTotalCount);
			} catch (err) {
				const errorMessage =
					err instanceof AxiosError && err.response?.data?.message
						? err.response.data.message
						: t('account.following.errorLoading');

				setFollowingError(errorMessage);
			} finally {
				setFollowingLoading(false, false);
			}
		},
		[
			userId,
			followingState.totalCount,
			setFollowing,
			setFollowingLoading,
			setFollowingError,
			setFollowingPagination,
			batchSetFollowRelationships,
			updateFollowingCount,
		]
	);

	// Load both followers and following data when Account screen is accessed
	useEffect(() => {
		if (!userId) return;

		// Load followers data if not already loaded
		if (
			followersState.users.length === 0 &&
			followingState.users.length === 0
		) {
			fetchFollowers(undefined, true);
			fetchFollowing(undefined, true);
		}
	}, [
		userId,
		followersState.users.length,
		followingState.users.length,
		fetchFollowers,
		fetchFollowing,
	]);

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
				return <FollowersTab fetchFollowers={fetchFollowers} />;
			case 'following':
				return <FollowingTab fetchFollowing={fetchFollowing} />;
			default:
				return <ProfileTab />;
		}
	};

	return (
		<OModalRequiredAuthen>
			<div className="min-h-screen bg-gray-50 py-4 md:py-8">
				<div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="mb-4 md:mb-8">
						<h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
							{t('account.title')}
						</h1>
						<p className="mt-1 text-sm text-gray-600 md:mt-2 md:text-base">
							{t('account.subtitle')}
						</p>
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
						<div className="px-3 py-4 md:px-6 md:py-8">
							{renderTabContent()}
						</div>
					</div>
				</div>
			</div>

			{/* Delete Account Modal */}
			<AModal
				isOpen={showDeleteModal}
				closeModal={() => setShowDeleteModal(false)}
			>
				<div className="space-y-3 md:space-y-4">
					<h2 className="text-lg font-bold md:text-xl">
						{t('account.deleteAccount')}
					</h2>
					<p className="text-sm text-gray-600 md:text-base">
						{t('account.deleteConfirmation')}
					</p>
					<div className="flex flex-col justify-end gap-2 sm:flex-row sm:gap-3">
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
