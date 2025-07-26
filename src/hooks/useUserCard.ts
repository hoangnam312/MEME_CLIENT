import { useState } from 'react';
import { useAuthen } from './useAuthen';

export interface UserCardData {
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
}

export const useUserCard = ({ user }: UseUserCardProps) => {
	const { isLoggedIn } = useAuthen();
	const [internalFollowing, setInternalFollowing] = useState(false);

	const handleFollowToggle = (newFollowState: boolean) => {
		setInternalFollowing(newFollowState);
		// !TODO: call api follow / unfollow
	};

	return {
		user,
		isLoggedIn: isLoggedIn(),
		isFollowing: internalFollowing,
		onFollowToggle: handleFollowToggle,
	};
};
