import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFire,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { ITrendingMeme, IMeme, TrendingTimeFrame } from 'src/constants/type';
import OTrendingMemeCard from '../OTrendingMemeCard/OTrendingMemeCard';
import OViewImage from '../../../../component/organisms/OViewImage/OViewImage';
import AButton from 'src/component/atoms/AButton/AButton';
import useOpen from 'src/hooks/useOpen';
import { getMemeIdFromUrl } from 'src/utils/memeViewUtils';

export interface OTrendingColumnProps {
	timeFrame: TrendingTimeFrame;
	memes: ITrendingMeme[];
	isLoading: boolean;
	error: string | null;
	onRetry: () => void;
	addClass?: string;
}

const OTrendingColumn: React.FC<OTrendingColumnProps> = ({
	timeFrame,
	memes,
	isLoading,
	error,
	onRetry,
	addClass = '',
}) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const [selectedMeme, setSelectedMeme] = useState<IMeme | null>(null);

	const convertTrendingMemeToIMeme = (meme: ITrendingMeme): IMeme => {
		return {
			_id: meme._id,
			name: meme.name,
			description: meme.description,
			tag: meme.tag,
			userId: meme.userId,
			location: meme.location,
			__v: meme.__v,
			imageOrigin: meme.imageOrigin,
			imageMedium: meme.imageMedium,
			imageSmall: meme.imageSmall,
			viewCount: meme.viewCount,
			likeCount: meme.likeCount,
			copyCount: meme.copyCount,
			dislikeCount: meme.dislikeCount,
			image: {
				imageOrigin: meme.imageOrigin,
				imageMedium: meme.imageMedium,
				imageSmall: meme.imageSmall,
			},
			stats: {
				viewCount: meme.viewCount,
				likeCount: meme.likeCount,
				copyCount: meme.copyCount,
				dislikeCount: meme.dislikeCount,
			},
			status: meme.status,
			createdAt: meme.createdAt,
			updatedAt: meme.updatedAt,
		};
	};

	const handleMemeClick = (meme: ITrendingMeme) => {
		const memeData = convertTrendingMemeToIMeme(meme);
		setSelectedMeme(memeData);
		openModal();
	};

	// Handle browser back/forward button and initial URL state
	useEffect(() => {
		const handlePopState = () => {
			const memeId = getMemeIdFromUrl();
			if (memeId && !isOpen) {
				// URL has meme ID but modal is closed - open it
				const meme = memes.find((m) => m._id === memeId);
				if (meme) {
					const memeData = convertTrendingMemeToIMeme(meme);
					setSelectedMeme(memeData);
					openModal();
				}
			} else if (!memeId && isOpen) {
				// URL has no meme ID but modal is open - close it
				closeModal();
			}
		};

		window.addEventListener('popstate', handlePopState);

		// Check initial URL state
		handlePopState();

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [memes, isOpen, openModal, closeModal]);

	// Check URL when memes first load or update
	useEffect(() => {
		const memeId = getMemeIdFromUrl();
		if (memeId && !isOpen && memes.length > 0) {
			const meme = memes.find((m) => m._id === memeId);
			if (meme) {
				const memeData = convertTrendingMemeToIMeme(meme);
				setSelectedMeme(memeData);
				openModal();
			}
		}
	}, [memes, isOpen, openModal]);

	const renderSkeletonCards = () => {
		return Array.from({ length: 12 }).map((_, index) => {
			const isVertical = index < 3;

			if (isVertical) {
				// Vertical skeleton (for top 3)
				return (
					<div
						key={index}
						className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md"
					>
						{/* Image skeleton */}
						<div className="h-40 w-full bg-gray-300"></div>

						{/* Metadata skeleton */}
						<div className="space-y-2 p-3">
							{/* Title skeleton */}
							<div className="h-3 w-3/4 rounded bg-gray-300"></div>

							{/* Stats skeleton */}
							<div className="grid grid-cols-3 gap-1">
								<div className="flex flex-col items-center rounded bg-gray-100 p-2">
									<div className="mb-1 h-2 w-4 rounded bg-gray-300"></div>
									<div className="h-2 w-6 rounded bg-gray-300"></div>
								</div>
								<div className="flex flex-col items-center rounded bg-gray-100 p-2">
									<div className="mb-1 h-2 w-4 rounded bg-gray-300"></div>
									<div className="h-2 w-6 rounded bg-gray-300"></div>
								</div>
								<div className="flex flex-col items-center rounded bg-gray-100 p-2">
									<div className="mb-1 h-2 w-4 rounded bg-gray-300"></div>
									<div className="h-2 w-6 rounded bg-gray-300"></div>
								</div>
							</div>

							{/* User info skeleton */}
							<div className="flex items-center gap-2 border-t border-gray-100 pt-2">
								<div className="h-5 w-5 rounded bg-gray-300"></div>
								<div className="h-2 w-12 rounded bg-gray-300"></div>
							</div>
						</div>
					</div>
				);
			} else {
				// Horizontal skeleton (for rank 4+)
				return (
					<div
						key={index}
						className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md"
					>
						<div className="flex flex-col sm:flex-row">
							{/* Image skeleton */}
							<div className="h-28 bg-gray-300 sm:h-20 sm:w-28 sm:flex-shrink-0"></div>

							{/* Details skeleton */}
							<div className="flex-1 space-y-2 p-3">
								{/* Title skeleton */}
								<div className="h-3 w-2/3 rounded bg-gray-300"></div>

								{/* Stats skeleton - horizontal */}
								<div className="flex gap-2">
									<div className="flex items-center gap-1">
										<div className="h-2.5 w-2.5 rounded bg-gray-300"></div>
										<div className="h-2 w-6 rounded bg-gray-300"></div>
									</div>
									<div className="flex items-center gap-1">
										<div className="h-2.5 w-2.5 rounded bg-gray-300"></div>
										<div className="h-2 w-6 rounded bg-gray-300"></div>
									</div>
									<div className="flex items-center gap-1">
										<div className="h-2.5 w-2.5 rounded bg-gray-300"></div>
										<div className="h-2 w-6 rounded bg-gray-300"></div>
									</div>
								</div>

								{/* User info skeleton */}
								<div className="flex items-center gap-2 border-t border-gray-100 pt-1">
									<div className="h-4 w-4 rounded bg-gray-300"></div>
									<div className="h-2 w-10 rounded bg-gray-300"></div>
								</div>
							</div>
						</div>
					</div>
				);
			}
		});
	};

	const renderContent = () => {
		if (isLoading && memes.length === 0) {
			return <div className="space-y-4">{renderSkeletonCards()}</div>;
		}

		if (error && memes.length === 0) {
			return (
				<div className="py-8 text-center">
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className="mb-3 text-4xl text-gray-500"
					/>
					<h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
						{error}
					</h4>
					<AButton onClick={onRetry} addClass="text-xs px-3 py-1">
						{t('trending.retry')}
					</AButton>
				</div>
			);
		}

		if (!isLoading && memes.length === 0) {
			return (
				<div className="py-8 text-center">
					<FontAwesomeIcon
						icon={faFire}
						className="mb-3 text-4xl text-gray-500"
					/>
					<h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
						{t('trending.empty')}
					</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">
						{t('trending.emptyDesc')}
					</p>
				</div>
			);
		}

		return (
			<div className="space-y-2">
				{memes.map((meme) => (
					<OTrendingMemeCard
						key={meme._id}
						data={meme}
						onClick={() => handleMemeClick(meme)}
						variant={meme.rank <= 3 ? 'vertical' : 'horizontal'}
						addClass={meme.rank <= 3 ? 'mb-1' : ''}
					/>
				))}
			</div>
		);
	};

	return (
		<>
			<div className={`rounded-xl bg-gray-50 p-3 ${addClass}`}>
				{/* Column Header */}
				<div className="mb-3 text-center">
					<h3 className="mb-1 text-base font-bold text-indigo-800 dark:text-white">
						{t(`trending.columns.${timeFrame}`)}
					</h3>
					<div className="mx-auto h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
				</div>

				{/* Column Content */}
				{renderContent()}
			</div>

			{/* Modal for meme detail view */}
			{selectedMeme && (
				<OViewImage
					isOpen={isOpen}
					closeModal={closeModal}
					data={selectedMeme}
				/>
			)}
		</>
	);
};

export default OTrendingColumn;
