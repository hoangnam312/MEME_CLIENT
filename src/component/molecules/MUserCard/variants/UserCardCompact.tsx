import { t } from 'i18next';
import React from 'react';
import AFollowButton from 'src/component/atoms/AFollowButton/AFollowButton';
import { UserCardData } from 'src/hooks/useUserCard';

export interface UserCardCompactProps {
	user: UserCardData;
	isLoggedIn: boolean;
	isFollowing: boolean;
	onFollowToggle: (isFollowing: boolean) => void;
	addClass?: string;
	onFollowersClick?: () => void;
	onFollowingClick?: () => void;
	enableFollowModal?: boolean;
}

const UserCardCompact: React.FC<UserCardCompactProps> = ({
	user,
	isLoggedIn,
	isFollowing,
	onFollowToggle,
	addClass = '',
	onFollowersClick,
	onFollowingClick,
	enableFollowModal = false,
}) => {
	return (
		<div className={`flex items-center gap-3 ${addClass}`}>
			<img
				className="h-12 w-12 rounded-xl"
				src={user.avatarUrl}
				alt={user.username}
			/>
			<div className="min-w-0 flex-1">
				<div className="truncate text-xl font-medium text-indigo-800 dark:text-white">
					{user.username}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400">
					<span
						className={
							enableFollowModal
								? 'cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400'
								: ''
						}
						onClick={onFollowersClick}
					>
						{user.followCount} {t('followers')}
					</span>
					{' - '}
					<span
						className={
							enableFollowModal
								? 'cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400'
								: ''
						}
						onClick={onFollowingClick}
					>
						{user.followingCount} {t('following')}
					</span>
				</div>
			</div>
			{isLoggedIn && (
				<AFollowButton
					isFollowing={isFollowing}
					onFollowToggle={onFollowToggle}
				/>
			)}
		</div>
	);
};

export default UserCardCompact;
