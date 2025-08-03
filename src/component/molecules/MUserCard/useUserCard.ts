import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import { useAuthen } from '../../../hooks/useAuthen';
import { followUser, unfollowUser } from 'src/service/follow';
import { useBoundStore } from 'src/store/store';

export interface UserCardData {
	id: string;
	avatarUrl: string;
	username: string; // Keep for internal identification
	displayName: string; // Add for display purposes
	followCount: number;
	followingCount: number;
	bio?: string;
	joinDate?: string;
}

export interface UseUserCardProps {
	user: UserCardData;
	isFollowing?: boolean;
	onFollowChange?: (isFollowing: boolean, newFollowerCount: number) => void;
}

export const useUserCard = ({
	user,
	isFollowing: initialFollowing,
	onFollowChange,
}: UseUserCardProps) => {
	const { isLoggedIn, userId } = useAuthen();

	// Get follow state from store
	const followRelationship = useBoundStore(
		(state) => state.follow.relationships[user.username]
	);
	const isFollowActionLoading = useBoundStore(
		(state) => state.follow.followActionLoading[user.username] || false
	);
	const {
		optimisticFollow,
		optimisticUnfollow,
		confirmFollowAction,
		setFollowActionLoading,
		setFollowRelationship,
	} = useBoundStore((state) => state.follow);

	// Determine follow status - prioritize store state, fallback to props, then false
	const isFollowing =
		followRelationship?.isFollowing ?? initialFollowing ?? false;

	// Initialize follow relationship in store if not present and we have initial data
	useEffect(() => {
		if (
			!followRelationship &&
			initialFollowing !== undefined &&
			isLoggedIn() &&
			userId !== user.username
		) {
			setFollowRelationship(user.username, {
				isFollowing: initialFollowing,
				isFollowedBy: false, // We don't have this info from props
			});
		}
	}, [
		followRelationship,
		initialFollowing,
		isLoggedIn,
		userId,
		user.username,
		setFollowRelationship,
	]);

	const handleFollowToggle = useCallback(
		async (newFollowState: boolean) => {
			if (!isLoggedIn()) {
				toast.error(t('auth.loginRequired'));
				return;
			}

			if (userId === user.username) {
				toast.error(t('followToast.cannotFollowSelf'));
				return;
			}

			// Start loading
			setFollowActionLoading(user.username, true);

			// Optimistic update
			if (newFollowState) {
				optimisticFollow(user.username, user);
			} else {
				optimisticUnfollow(user.username);
			}

			try {
				if (newFollowState) {
					await followUser(user.id);
					toast.success(
						t('followToast.followSuccess', {
							username: user.displayName || user.username,
						})
					);
				} else {
					await unfollowUser(user.id);
					toast.success(
						t('followToast.unfollowSuccess', {
							username: user.displayName || user.username,
						})
					);
				}

				// Confirm the optimistic update was successful
				confirmFollowAction(user.username, true);

				// Notify parent component about the change
				if (onFollowChange) {
					onFollowChange(newFollowState, 0);
				}
			} catch (err) {
				const errorMessage =
					err instanceof AxiosError && err.response?.data?.message
						? err.response.data.message
						: newFollowState
						? t('followToast.followError')
						: t('followToast.unfollowError');

				toast.error(errorMessage);
				// Revert optimistic update
				confirmFollowAction(user.username, false);
			} finally {
				setFollowActionLoading(user.username, false);
			}
		},
		[
			isLoggedIn,
			userId,
			user,
			optimisticFollow,
			optimisticUnfollow,
			confirmFollowAction,
			setFollowActionLoading,
			onFollowChange,
		]
	);

	return {
		user,
		isLoggedIn: isLoggedIn(),
		isFollowing,
		isFollowLoading: isFollowActionLoading,
		onFollowToggle: handleFollowToggle,
	};
};
