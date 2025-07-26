import { faCopy, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { ITrendingMeme } from 'src/constants/type';
import { UserCardData } from 'src/hooks/useUserCard';
import { trackingMeme } from 'src/service/meme';
import { OCardImage } from '../../../../component/organisms/OCardImage/OCardImage';

export interface OTrendingMemeCardProps {
	data: ITrendingMeme;
	onClick?: () => void;
	addClass?: string;
	variant?: 'vertical' | 'horizontal';
}

const OTrendingMemeCard: React.FC<OTrendingMemeCardProps> = ({
	data,
	onClick,
	addClass = '',
	variant = 'vertical',
}) => {
	const [isHover, setIsHover] = useState(false);

	const handleClick = () => {
		trackingMeme({
			memeId: data._id,
			action: 'view',
		});
		if (onClick) onClick();
	};

	const userCardData: UserCardData = {
		avatarUrl: data.uploader.avatarUrl,
		username: data.uploader.username,
		displayName: data.uploader.displayName || data.uploader.username,
		followCount: data.uploader.followCount,
		followingCount: data.uploader.followingCount,
	};

	// Render vertical layout (for ranks 1-3)
	if (variant === 'vertical') {
		return (
			<div
				className={`cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${addClass}`}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={handleClick}
			>
				{/* Clean Image - No Overlays */}
				<OCardImage data={data} onClick={handleClick} />

				{/* Metadata Section - Outside Image */}
				<div className="space-y-3 p-3">
					{/* Rank and Title */}
					<div className="flex items-start justify-between">
						<div className="min-w-0 flex-1">
							{data.name && (
								<h3 className="truncate text-sm font-medium text-gray-900">
									{data.name}
								</h3>
							)}
						</div>
						<div className="ml-2 flex-shrink-0">
							<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
								#{data.rank}
							</span>
						</div>
					</div>

					{/* Analytics Stats */}
					<div className="grid grid-cols-3 gap-1 text-xs">
						{/* Likes */}
						<div className="flex flex-col items-center rounded bg-red-50 p-2">
							<FontAwesomeIcon
								icon={faThumbsUp}
								className="mb-1 h-3 w-3 text-gray-500"
							/>
							<div>
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.likesGained}
								</span>
								<span className="text-xs font-medium text-gray-500">
									{' '}
									&nbsp; / &nbsp;
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalLikes}
								</span>
							</div>
						</div>

						{/* Copies */}
						<div className="flex flex-col items-center rounded bg-blue-50 p-2">
							<FontAwesomeIcon
								icon={faCopy}
								className="mb-1 h-3 w-3 text-gray-500"
							/>
							<div>
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.copiesGained}
								</span>
								<span className="text-xs font-medium text-gray-500">
									{' '}
									&nbsp; / &nbsp;
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalCopies}
								</span>
							</div>
						</div>

						{/* Views */}
						<div className="flex flex-col items-center rounded bg-green-50 p-2">
							<FontAwesomeIcon
								icon={faEye}
								className="mb-1 h-3 w-3 text-gray-500"
							/>
							<div>
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.viewsGained}
								</span>
								<span className="text-xs font-medium text-gray-500">
									{' '}
									&nbsp; / &nbsp;
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalViews}
								</span>
							</div>
						</div>
					</div>

					{/* Uploader Info */}
					<div className="border-t border-gray-100 pt-2">
						<MUserCard
							variant="minimal"
							user={userCardData}
							enableFollowModal={false}
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
			className={`cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg ${addClass}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onClick={handleClick}
		>
			{/* Horizontal Layout: Image Left, Details Right */}
			<div className="flex flex-col sm:flex-row">
				{/* Image Column */}
				<OCardImage data={data} onClick={handleClick} />

				{/* Details Column */}
				<div className="flex-1 space-y-2 p-3">
					{/* Rank and Title */}
					<div className="flex items-start justify-between">
						<div className="min-w-0 flex-1">
							{data.name && (
								<h3 className="truncate text-sm font-medium leading-tight text-gray-900">
									{data.name}
								</h3>
							)}
						</div>
						<div className="ml-2 flex-shrink-0">
							<span className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800">
								#{data.rank}
							</span>
						</div>
					</div>

					{/* Analytics Stats - Horizontal */}
					<div className="flex justify-between gap-2 text-xs">
						{/* Likes */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faThumbsUp}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<div className="flex flex-col items-center gap-1">
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.likesGained}
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalLikes}
								</span>
							</div>
						</div>

						{/* Copies */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faCopy}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<div className="flex flex-col items-center gap-1">
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.copiesGained}
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalCopies}
								</span>
							</div>
						</div>

						{/* Views */}
						<div className="flex items-center gap-1">
							<FontAwesomeIcon
								icon={faEye}
								className="h-2.5 w-2.5 text-gray-500"
							/>
							<div className="flex flex-col items-center gap-1">
								<span className="text-xs font-medium text-violet-900">
									{data.analytics.viewsGained}
								</span>
								<span className="text-xs font-medium text-emerald-300">
									{data.analytics.totalViews}
								</span>
							</div>
						</div>
					</div>

					{/* Uploader Info */}
					<div className="border-t border-gray-100 pt-1">
						<MUserCard
							variant="minimal"
							user={userCardData}
							enableFollowModal={false}
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

export default OTrendingMemeCard;
