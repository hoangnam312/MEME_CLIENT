import React from 'react';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';

export interface UserCardMinimalProps {
	user: UserCardData;
	isLoggedIn: boolean;
	isFollowing: boolean;
	onFollowToggle: (isFollowing: boolean) => void;
	addClass?: string;
	onFollowersClick?: () => void;
	onFollowingClick?: () => void;
	enableFollowModal?: boolean;
}

const UserCardMinimal: React.FC<UserCardMinimalProps> = ({
	user,
	addClass = '',
}) => {
	return (
		<div className={`flex items-center gap-2 ${addClass}`}>
			<img
				className="h-8 w-8 rounded-lg"
				src={user.avatarUrl}
				alt={user.displayName || user.username}
			/>
			<span className="text-sm font-medium text-indigo-800 dark:text-white">
				{user.displayName || user.username}
			</span>
		</div>
	);
};

export default UserCardMinimal;
