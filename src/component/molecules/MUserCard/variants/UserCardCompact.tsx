import { t } from 'i18next';
import React from 'react';
import AFollowButton from 'src/component/atoms/AFollowButton/AFollowButton';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';

export interface UserCardCompactProps {
	user: UserCardData;
	isShowFollowButton?: boolean;
	isFollowing: boolean;
	onFollowToggle: (isFollowing: boolean) => void;
	addClass?: string;
	onFollowersClick?: () => void;
	onFollowingClick?: () => void;
	enableFollowModal?: boolean;
}

const UserCardCompact: React.FC<UserCardCompactProps> = ({
	user,
	isShowFollowButton = true,
	isFollowing,
	onFollowToggle,
	addClass = '',
	onFollowersClick,
	onFollowingClick,
	enableFollowModal = false,
}) => {
	return (
		<div
			className={`flex items-center gap-2 rounded-lg bg-indigo-200 p-1.5 md:gap-3 md:p-2 dark:bg-indigo-900 ${addClass}`}
		>
			<img
				className="h-10 w-10 rounded-lg md:h-12 md:w-12 md:rounded-xl"
				src={user.avatarUrl}
				alt={user.displayName || user.username}
			/>
			<div className="min-w-0 flex-1">
				<div className="truncate text-sm font-medium text-indigo-800 md:text-base lg:text-xl dark:text-white">
					{user.displayName || user.username}
				</div>
				<div className="text-[10px] text-gray-500 md:text-xs dark:text-gray-400">
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
			{isShowFollowButton && (
				<AFollowButton
					isFollowing={isFollowing}
					onFollowToggle={onFollowToggle}
				/>
			)}
		</div>
	);
};

export default UserCardCompact;
