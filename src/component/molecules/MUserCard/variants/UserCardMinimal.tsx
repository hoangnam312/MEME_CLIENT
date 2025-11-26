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
	onFollowersClick,
}) => {
	return (
		<div
			className={`flex items-center gap-1.5 rounded-lg bg-indigo-200 p-1 md:gap-2 md:p-1.5 dark:bg-indigo-900 ${addClass}`}
			onClick={() => onFollowersClick?.()}
		>
			<img
				className="h-7 w-7 rounded-md md:h-8 md:w-8 md:rounded-lg"
				src={user.avatarUrl}
				alt={user.displayName || user.username}
			/>
			<span className="text-xs font-medium text-indigo-800 md:text-sm dark:text-white">
				{user.displayName || user.username}
			</span>
		</div>
	);
};

export default UserCardMinimal;
