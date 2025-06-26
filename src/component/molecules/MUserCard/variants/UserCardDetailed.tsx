import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import AFollowButton from 'src/component/atoms/AFollowButton/AFollowButton';
import { UserCardData } from 'src/hooks/useUserCard';
import { t } from 'i18next';

export interface UserCardDetailedProps {
	user: UserCardData;
	isLoggedIn: boolean;
	isFollowing: boolean;
	onFollowToggle: (isFollowing: boolean) => void;
	addClass?: string;
	onFollowersClick?: () => void;
	onFollowingClick?: () => void;
	enableFollowModal?: boolean;
}

const UserCardDetailed: React.FC<UserCardDetailedProps> = ({
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
		<div
			className={`rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800 ${addClass}`}
		>
			<div className="flex flex-col items-center text-center">
				<img
					className="mb-4 h-20 w-20 rounded-2xl"
					src={user.avatarUrl}
					alt={user.username}
				/>

				<div className="mb-2 flex items-center gap-2">
					<h3 className="text-xl font-bold text-indigo-800 dark:text-white">
						{user.username}
					</h3>
					{user.verified && (
						<FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />
					)}
				</div>

				{user.bio && (
					<p className="mb-4 max-w-sm text-gray-600 dark:text-gray-300">
						{user.bio}
					</p>
				)}

				<div className="mb-4 flex gap-6">
					<div
						className={`text-center ${
							enableFollowModal
								? 'cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700'
								: ''
						}`}
						onClick={onFollowersClick}
					>
						<div className="text-lg font-bold text-indigo-800 dark:text-white">
							{user.followCount}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{t('followers')}
						</div>
					</div>
					<div
						className={`text-center ${
							enableFollowModal
								? 'cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700'
								: ''
						}`}
						onClick={onFollowingClick}
					>
						<div className="text-lg font-bold text-indigo-800 dark:text-white">
							{user.followingCount}
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							{t('following')}
						</div>
					</div>
				</div>

				{user?.joinDate && (
					<div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
						<FontAwesomeIcon icon={faCalendarAlt} />
						<span>
							{t('joinedIn')} {user.joinDate}
						</span>
					</div>
				)}

				{isLoggedIn && (
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
