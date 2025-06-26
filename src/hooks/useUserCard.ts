import { useState } from 'react';
import { useAuthen } from './useAuthen';

export interface UserCardData {
	avatarUrl: string;
	username: string;
	followCount: number;
	followingCount: number;
	bio?: string;
	joinDate?: string;
	verified?: boolean;
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
