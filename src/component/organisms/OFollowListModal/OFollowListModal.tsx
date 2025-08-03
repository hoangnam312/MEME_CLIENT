import React, { useEffect, useState, useCallback } from 'react';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import AModal from 'src/component/atoms/AModal/AModal';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';
import {
	getFollowers,
	getFollowing,
	transformFollowUserToUserCardData,
} from 'src/service/follow';
import { useBoundStore } from 'src/store/store';
import { useAuthen } from 'src/hooks/useAuthen';

export interface OFollowListModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: string;
	defaultTab?: 'followers' | 'following';
}

const OFollowListModal: React.FC<OFollowListModalProps> = ({
	isOpen,
	onClose,
	userId,
	defaultTab = 'followers',
}) => {
	const [activeTab, setActiveTab] = useState(defaultTab);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { userId: currentUserId } = useAuthen();

	// For current user, use data from store; for other users, use local state
	const isCurrentUser = currentUserId === userId;
	const storeFollowersState = useBoundStore((state) => state.follow.followers);
	const storeFollowingState = useBoundStore((state) => state.follow.following);
	const [localFollowers, setLocalFollowers] = useState<UserCardData[]>([]);
	const [localFollowing, setLocalFollowing] = useState<UserCardData[]>([]);

	// Choose data source based on whether it's current user or not
	const followers = isCurrentUser ? storeFollowersState.users : localFollowers;
	const following = isCurrentUser ? storeFollowingState.users : localFollowing;

	const tabs = [
		{ key: 'followers', label: t('followers') },
		{ key: 'following', label: t('following') },
	];

	useEffect(() => {
		setActiveTab(defaultTab);
	}, [defaultTab]);

	const fetchFollowers = useCallback(async () => {
		if (!userId) return;
		setIsLoading(true);
		setError(null);

		try {
			const response = await getFollowers(userId, { limit: 50 });
			const transformedUsers = response.data.data.map(
				transformFollowUserToUserCardData
			);

			if (isCurrentUser) {
				// Update store for current user - this is handled by the tabs components
				// We don't need to do anything here as the store is already managed
			} else {
				// Update local state for other users
				setLocalFollowers(transformedUsers);
			}
		} catch (err) {
			const errorMessage =
				err instanceof AxiosError && err.response?.data?.message
					? err.response.data.message
					: t('modal.followers.errorLoading');
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [userId, isCurrentUser]);

	const fetchFollowing = useCallback(async () => {
		if (!userId) return;
		setIsLoading(true);
		setError(null);

		try {
			const response = await getFollowing(userId, { limit: 50 });
			const transformedUsers = response.data.data.map(
				transformFollowUserToUserCardData
			);

			if (isCurrentUser) {
				// Update store for current user - this is handled by the tabs components
				// We don't need to do anything here as the store is already managed
			} else {
				// Update local state for other users
				setLocalFollowing(transformedUsers);
			}
		} catch (err) {
			const errorMessage =
				err instanceof AxiosError && err.response?.data?.message
					? err.response.data.message
					: t('modal.following.errorLoading');
			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [userId, isCurrentUser]);

	// Load data when modal opens or tab changes
	useEffect(() => {
		if (isOpen && userId) {
			if (isCurrentUser) {
				// For current user, data should already be in store from the tabs
				// Only fetch if store is empty
				if (
					activeTab === 'followers' &&
					storeFollowersState.users.length === 0
				) {
					fetchFollowers();
				} else if (
					activeTab === 'following' &&
					storeFollowingState.users.length === 0
				) {
					fetchFollowing();
				}
			} else {
				// For other users, always fetch fresh data
				if (activeTab === 'followers' && localFollowers.length === 0) {
					fetchFollowers();
				} else if (activeTab === 'following' && localFollowing.length === 0) {
					fetchFollowing();
				}
			}
		}
	}, [
		isOpen,
		activeTab,
		userId,
		isCurrentUser,
		storeFollowersState.users.length,
		storeFollowingState.users.length,
		localFollowers.length,
		localFollowing.length,
		fetchFollowers,
		fetchFollowing,
	]);

	const currentUserList = activeTab === 'followers' ? followers : following;

	const handleTabChange = (val: string) => {
		setActiveTab(val as 'followers' | 'following');
	};

	return (
		<AModal isOpen={isOpen} closeModal={onClose} addClassWrap="!w-1/2">
			<div className="mb-4">
				<h2 className="mb-4 text-2xl font-bold text-indigo-800 dark:text-white">
					{activeTab === 'followers' ? t('followers') : t('following')}
				</h2>

				<ATabs
					tabs={tabs}
					value={activeTab}
					onChange={handleTabChange}
					addClass="w-full"
				/>
			</div>

			<div className="mb-4 max-h-96 overflow-y-auto">
				{isLoading ? (
					<div className="flex items-center justify-center py-8">
						<div className="text-center">
							<div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600"></div>
							<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
								{t('modal.loading')}
							</p>
						</div>
					</div>
				) : error ? (
					<div className="py-8 text-center">
						<p className="mb-2 text-red-500 dark:text-red-400">{error}</p>
						<button
							onClick={
								activeTab === 'followers' ? fetchFollowers : fetchFollowing
							}
							className="text-sm text-indigo-600 hover:text-indigo-700"
						>
							{t('modal.retry')}
						</button>
					</div>
				) : currentUserList.length > 0 ? (
					<div className="space-y-3">
						{currentUserList.map((user, index) => (
							<MUserCard
								key={`${user.username}-${index}`}
								variant="compact"
								user={user}
								addClass="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
								enableFollowModal={false}
							/>
						))}
					</div>
				) : (
					<div className="py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							{activeTab === 'followers'
								? t('noFollowersYet')
								: t('notFollowingAnyone')}
						</p>
					</div>
				)}
			</div>
		</AModal>
	);
};

export default OFollowListModal;
