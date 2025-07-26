import {
	faUsers,
	faImage,
	faThumbsUp,
	faCopy,
	faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ITrendingUser } from 'src/constants/type';
import AFollowButton from 'src/component/atoms/AFollowButton/AFollowButton';

export interface OTrendingUserCardProps {
	data: ITrendingUser;
	onClick?: () => void;
	addClass?: string;
	variant?: 'vertical' | 'horizontal';
}

const OTrendingUserCard: React.FC<OTrendingUserCardProps> = ({
	data,
	onClick,
	addClass = '',
	variant = 'vertical',
}) => {
	const [isHover, setIsHover] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);

	const handleClick = () => {
		if (onClick) onClick();
	};

	const handleFollowClick = (isFollowing: boolean) => {
		setIsFollowing(isFollowing);
	};

	// Render vertical layout (for ranks 1-3)
	if (variant === 'vertical') {
		return (
			<div
				className={`relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${addClass}`}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={handleClick}
			>
				{/* Rank Badge - Top-right corner, transparent background */}
				<div className="absolute right-2 top-2 text-lg font-bold text-gray-700">
					#{data.rank}
				</div>

				{/* Avatar Section - MUserCard style */}
				<div className="flex justify-center p-4">
					<img
						src={data.avatarUrl}
						alt={data.displayName || data.username}
						className="h-16 w-16 rounded-xl object-cover"
					/>
				</div>

				{/* User Info Section */}
				<div className="space-y-3 p-3">
					{/* Username */}
					<div className="text-center">
						<h3 className="text-sm font-bold text-gray-900">
							{data.displayName || data.username}
						</h3>
						{data.bio && (
							<p className="mt-1 line-clamp-2 text-xs text-gray-600">
								{data.bio}
							</p>
						)}
					</div>

					{/* Analytics Stats Grid - 5 columns for all stats */}
					<div className="grid grid-cols-3 gap-1">
						{/* Followers Gained */}
						<div className="flex flex-col items-center rounded bg-blue-50 p-1.5">
							<FontAwesomeIcon
								icon={faUsers}
								className="mb-1 h-2.5 w-2.5 text-gray-500"
							/>
							<div className="text-center">
								<div className="text-xs font-medium text-violet-900">
									{data.analytics.followersGained}
								</div>
								<div className="text-xs text-emerald-600">
									{data.analytics.totalFollowers}
								</div>
							</div>
						</div>

						{/* Memes Posted */}
						<div className="flex flex-col items-center rounded bg-purple-50 p-1.5">
							<FontAwesomeIcon
								icon={faImage}
								className="mb-1 h-2.5 w-2.5 text-gray-500"
							/>
							<div className="text-center">
								<div className="text-xs font-medium text-violet-900">
									{data.analytics.memesPosted}
								</div>
								<div className="text-xs text-emerald-600">
									{data.analytics.totalMemes}
								</div>
							</div>
						</div>

						{/* Likes Received */}
						<div className="flex flex-col items-center rounded bg-green-50 p-1.5">
							<FontAwesomeIcon
								icon={faThumbsUp}
								className="mb-1 h-2.5 w-2.5 text-gray-500"
							/>
							<div className="text-center">
								<div className="text-xs font-medium text-violet-900">
									{data.analytics.likesReceived}
								</div>
								<div className="text-xs text-emerald-600">
									{data.analytics.totalLikes}
								</div>
							</div>
						</div>

						{/* Copies with Growth */}
						<div className="flex flex-col items-center rounded bg-orange-50 p-1.5">
							<FontAwesomeIcon
								icon={faCopy}
								className="mb-1 h-2.5 w-2.5 text-gray-500"
							/>
							<div className="text-center">
								<div className="text-xs font-medium text-violet-900">
									{data.analytics.copiesReceived}
								</div>
								<div className="text-xs text-emerald-600">
									{data.analytics.totalCopies}
								</div>
							</div>
						</div>

						{/* Views with Growth */}
						<div className="flex flex-col items-center rounded bg-indigo-50 p-1.5">
							<FontAwesomeIcon
								icon={faEye}
								className="mb-1 h-2.5 w-2.5 text-gray-500"
							/>
							<div className="text-center">
								<div className="text-xs font-medium text-violet-900">
									{data.analytics.viewsReceived}
								</div>
								<div className="text-xs text-emerald-600">
									{data.analytics.totalViews}
								</div>
							</div>
						</div>
					</div>

					{/* Follow Button - Natural sizing */}
					<div className="flex justify-center pt-2">
						<AFollowButton
							isFollowing={isFollowing}
							onFollowToggle={handleFollowClick}
							addClass="text-xs py-2 px-4"
						/>
					</div>
				</div>

				{/* Subtle Hover Effect */}
				{isHover && (
					<div className="pointer-events-none absolute inset-0 bg-indigo-500/5" />
				)}
			</div>
		);
	}

	// Render horizontal layout (for ranks 4+)
	return (
		<div
			className={`relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${addClass}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={handleClick}
		>
			{/* Rank Badge - Top-right corner, transparent background */}
			<div className="absolute right-2 top-2 text-base font-bold text-gray-700">
				#{data.rank}
			</div>

			{/* Horizontal Layout: Avatar Left, Details Right */}
			<div className="flex flex-col sm:flex-row">
				{/* Avatar Column - MUserCard style */}
				<div className="flex justify-center p-3 sm:justify-start">
					<img
						src={data.avatarUrl}
						alt={data.displayName || data.username}
						className="h-12 w-12 rounded-xl object-cover"
					/>
				</div>

				{/* Details Column */}
				<div className="max-w-2/3 flex-1 space-y-2 p-3">
					{/* Username */}
					<div className="flex items-start justify-between pr-8">
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-sm font-medium text-gray-900">
								{data.displayName || data.username}
							</h3>
							{data.bio && (
								<p className="line-clamp-1 text-xs text-gray-600">{data.bio}</p>
							)}
						</div>
					</div>

					{/* Analytics Stats - Horizontal */}
					<div className="flex flex-wrap justify-between gap-2 text-xs">
						{/* Followers */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faUsers}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<span className="text-xs font-medium text-violet-900">
								{data.analytics.followersGained}
							</span>
							<span className="text-xs text-emerald-600">
								/{data.analytics.totalFollowers}
							</span>
						</div>

						{/* Memes */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faImage}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<span className="text-xs font-medium text-violet-900">
								{data.analytics.memesPosted}
							</span>
							<span className="text-xs text-emerald-600">
								/{data.analytics.totalMemes}
							</span>
						</div>

						{/* Likes */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faThumbsUp}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<span className="text-xs font-medium text-violet-900">
								{data.analytics.likesReceived}
							</span>
							<span className="text-xs text-emerald-600">
								/{data.analytics.totalLikes}
							</span>
						</div>

						{/* Copies with Growth */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faCopy}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<span className="text-xs font-medium text-violet-900">
								{data.analytics.copiesReceived}
							</span>
							<span className="text-xs text-emerald-600">
								/{data.analytics.totalCopies}
							</span>
						</div>

						{/* Views with Growth */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faEye}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<span className="text-xs font-medium text-violet-900">
								{data.analytics.viewsReceived}
							</span>
							<span className="text-xs text-emerald-600">
								/{data.analytics.totalViews}
							</span>
						</div>
					</div>

					{/* Follow Button - Natural sizing */}
					<div className="pt-1">
						<AFollowButton
							isFollowing={isFollowing}
							onFollowToggle={handleFollowClick}
							addClass="text-xs py-1 px-3"
						/>
					</div>
				</div>
			</div>

			{/* Subtle Hover Effect */}
			{isHover && (
				<div className="pointer-events-none absolute inset-0 bg-indigo-500/5" />
			)}
		</div>
	);
};

export default OTrendingUserCard;
