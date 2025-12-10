import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React from 'react';
import AFollowButton from 'src/component/atoms/AFollowButton/AFollowButton';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';

export interface UserCardDetailedProps {
	user: UserCardData;
	isShowFollowButton?: boolean;
	isFollowing: boolean;
	onFollowToggle: (isFollowing: boolean) => void;
	addClass?: string;
	onFollowersClick?: () => void;
	onFollowingClick?: () => void;
	enableFollowModal?: boolean;
}

const UserCardDetailed: React.FC<UserCardDetailedProps> = ({
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
			className={`rounded-xl bg-indigo-200 p-4 shadow-lg md:rounded-2xl md:p-6 dark:bg-indigo-900 ${addClass}`}
		>
			<div className="flex flex-col items-center text-center">
				<img
					className="mb-3 h-16 w-16 rounded-xl md:mb-4 md:h-20 md:w-20 md:rounded-2xl"
					src={user.avatarUrl}
					alt={user.displayName || user.username}
				/>

				<div className="mb-2 flex items-center gap-2">
					<h3 className="text-lg font-bold text-indigo-800 md:text-xl dark:text-white">
						{user.displayName || user.username}
					</h3>
				</div>

				{user.bio && (
					<p className="mb-3 max-w-sm text-sm text-gray-600 md:mb-4 md:text-base dark:text-gray-300">
						{user.bio}
					</p>
				)}

				<div className="mb-3 flex gap-4 md:mb-4 md:gap-6">
					<div
						className={`text-center ${
							enableFollowModal
								? 'cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-gray-50 md:p-2 dark:hover:bg-gray-700'
								: ''
						}`}
						onClick={onFollowersClick}
					>
						<div className="text-base font-bold text-indigo-800 md:text-lg dark:text-white">
							{user.followCount}
						</div>
						<div className="text-xs text-gray-500 md:text-sm dark:text-gray-400">
							{t('followers')}
						</div>
					</div>
					<div
						className={`text-center ${
							enableFollowModal
								? 'cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-gray-50 md:p-2 dark:hover:bg-gray-700'
								: ''
						}`}
						onClick={onFollowingClick}
					>
						<div className="text-base font-bold text-indigo-800 md:text-lg dark:text-white">
							{user.followingCount}
						</div>
						<div className="text-xs text-gray-500 md:text-sm dark:text-gray-400">
							{t('following')}
						</div>
					</div>
				</div>

				{user?.joinDate && (
					<div className="mb-3 flex items-center gap-2 text-xs text-gray-500 md:mb-4 md:text-sm dark:text-gray-400">
						<FontAwesomeIcon icon={faCalendarAlt} />
						<span>
							{t('joinedIn')} {user.joinDate}
						</span>
					</div>
				)}

				{isShowFollowButton && (
					<AFollowButton
						isFollowing={isFollowing}
						onFollowToggle={onFollowToggle}
					/>
				)}
			</div>
		</div>
	);
};

export default UserCardDetailed;
