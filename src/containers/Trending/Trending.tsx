import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import OTrendingColumn from 'src/containers/Trending/component/OTrendingColumn/OTrendingColumn';
import ATabs, { TabItem } from 'src/component/atoms/ATabs/ATabs';
import {
	ITrendingMeme,
	TrendingTimeFrame,
	TIMEFRAME_TO_PERIOD_MAP,
	ITrendingMemeData,
} from 'src/constants/type';
import { getTrendingMemes } from 'src/service/meme';

const Trending: React.FC = () => {
	// State for each time frame column
	const [trending24h, setTrending24h] = useState<ITrendingMeme[]>([]);
	const [trending1w, setTrending1w] = useState<ITrendingMeme[]>([]);
	const [trending1m, setTrending1m] = useState<ITrendingMeme[]>([]);

	// Loading states for each column
	const [loading24h, setLoading24h] = useState(true);
	const [loading1w, setLoading1w] = useState(true);
	const [loading1m, setLoading1m] = useState(true);

	// Error states for each column
	const [error24h, setError24h] = useState<string | null>(null);
	const [error1w, setError1w] = useState<string | null>(null);
	const [error1m, setError1m] = useState<string | null>(null);

	// Mobile tab state - show only one time frame at a time on mobile
	const [activeTab, setActiveTab] = useState<TrendingTimeFrame>('24h');

	// Tab configuration for mobile
	const tabs: TabItem[] = [
		{
			key: '24h',
			label: t('trending.tabs.24h'),
		},
		{
			key: '1w',
			label: t('trending.tabs.1w'),
		},
		{
			key: '1m',
			label: t('trending.tabs.1m'),
		},
	];

	// Convert backend trending data to frontend format
	const convertTrendingData = (data: ITrendingMemeData[]): ITrendingMeme[] => {
		return data.map((item) => ({
			...item.meme,
			rank: item.rank,
			hasLiked: item.meme.hasLiked,
			hasDisliked: item.meme.hasDisliked,
			analytics: {
				likesGained: item.likeCount,
				copiesGained: item.copyCount,
				viewsGained: item.viewCount,
				totalLikes: item.meme.stats.likeCount,
				totalCopies: item.meme.stats.copyCount,
				totalViews: item.meme.stats.viewCount,
				trendingScore: item.score,
				timeFrame: '24h' as TrendingTimeFrame,
			},
			uploader: item.meme.creator
				? {
						_id: item.meme.creator._id,
						username: item.meme.creator.username,
						displayName:
							item.meme.creator.displayName || item.meme.creator.username,
						avatarUrl: item.meme.creator.avatarUrl || '',
						followCount: item.meme.creator.followCount,
						followingCount: item.meme.creator.followingCount,
				  }
				: {
						_id: item.meme.userId,
						username: 'Unknown',
						displayName: 'Unknown User',
						avatarUrl: '',
						followCount: 0,
						followingCount: 0,
				  },
		}));
	};

	// Fetch trending memes for a specific time frame
	const fetchTrendingMemes = async (
		timeFrame: TrendingTimeFrame,
		cursor?: string,
		append = false
	) => {
		try {
			// Set loading state for specific time frame
			if (timeFrame === '24h') setLoading24h(true);
			else if (timeFrame === '1w') setLoading1w(true);
			else if (timeFrame === '1m') setLoading1m(true);

			// Clear error for specific time frame
			if (timeFrame === '24h') setError24h(null);
			else if (timeFrame === '1w') setError1w(null);
			else if (timeFrame === '1m') setError1m(null);

			// Map frontend timeframe to backend period
			const period = TIMEFRAME_TO_PERIOD_MAP[timeFrame];

			const response = await getTrendingMemes({
				period,
				limit: 15,
				cursor,
			});

			if (response.data.success && response.data.data) {
				const memesWithRank = convertTrendingData(response.data.data);

				// Update state for specific time frame
				if (timeFrame === '24h') {
					if (append) {
						setTrending24h((prev) => [...prev, ...memesWithRank]);
					} else {
						setTrending24h(memesWithRank);
					}
				} else if (timeFrame === '1w') {
					if (append) {
						setTrending1w((prev) => [...prev, ...memesWithRank]);
					} else {
						setTrending1w(memesWithRank);
					}
				} else if (timeFrame === '1m') {
					if (append) {
						setTrending1m((prev) => [...prev, ...memesWithRank]);
					} else {
						setTrending1m(memesWithRank);
					}
				}
			} else {
				// Handle empty response
				if (!append) {
					if (timeFrame === '24h') setTrending24h([]);
					else if (timeFrame === '1w') setTrending1w([]);
					else if (timeFrame === '1m') setTrending1m([]);
				}
			}
		} catch (err) {
			console.error(`Error fetching trending memes for ${timeFrame}:`, err);

			// Set error for specific time frame
			if (timeFrame === '24h') setError24h(t('trending.error'));
			else if (timeFrame === '1w') setError1w(t('trending.error'));
			else if (timeFrame === '1m') setError1m(t('trending.error'));

			// Generate mock data for development
			if (process.env.NODE_ENV === 'development') {
				const mockMemes = generateMockMemes(timeFrame, 1);
				if (timeFrame === '24h')
					setTrending24h(
						append ? (prev) => [...prev, ...mockMemes] : mockMemes
					);
				else if (timeFrame === '1w')
					setTrending1w(append ? (prev) => [...prev, ...mockMemes] : mockMemes);
				else if (timeFrame === '1m')
					setTrending1m(append ? (prev) => [...prev, ...mockMemes] : mockMemes);
			}
		} finally {
			// Clear loading state for specific time frame
			if (timeFrame === '24h') setLoading24h(false);
			else if (timeFrame === '1w') setLoading1w(false);
			else if (timeFrame === '1m') setLoading1m(false);
		}
	};

	// Retry on error for specific time frame
	const handleRetry = (timeFrame: TrendingTimeFrame) => {
		fetchTrendingMemes(timeFrame, undefined, false);
	};

	// Initial load for all time frames
	useEffect(() => {
		fetchTrendingMemes('24h');
		fetchTrendingMemes('1w');
		fetchTrendingMemes('1m');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Mock data generator for development
	const generateMockMemes = (
		timeFrame: TrendingTimeFrame,
		page: number
	): ITrendingMeme[] => {
		const startIndex = (page - 1) * 15;
		return Array.from({ length: 15 }, (_, index) => ({
			_id: `trending-${timeFrame}-${startIndex + index + 1}`,
			name: `${timeFrame.toUpperCase()} Trending Meme ${
				startIndex + index + 1
			}`,
			description: `This is a trending meme for ${timeFrame} period`,
			tag: `trending meme${startIndex + index + 1}`,
			userId: `user-${startIndex + index + 1}`,
			location: `https://picsum.photos/400/600?random=${
				startIndex + index + 1
			}`,
			__v: 0,
			imageMedium: `https://picsum.photos/800/1200?random=${
				startIndex + index + 1
			}`,
			imageSmall: `https://picsum.photos/400/600?random=${
				startIndex + index + 1
			}`,
			imageOrigin: `https://picsum.photos/1200/1800?random=${
				startIndex + index + 1
			}`,
			viewCount: Math.floor(Math.random() * 10000) + 1000,
			likeCount: Math.floor(Math.random() * 5000) + 500,
			copyCount: Math.floor(Math.random() * 2000) + 200,
			dislikeCount: Math.floor(Math.random() * 500) + 50,
			// Add missing required properties
			image: {
				imageOrigin: `https://picsum.photos/1200/1800?random=${
					startIndex + index + 1
				}`,
				imageMedium: `https://picsum.photos/800/1200?random=${
					startIndex + index + 1
				}`,
				imageSmall: `https://picsum.photos/400/600?random=${
					startIndex + index + 1
				}`,
			},
			stats: {
				viewCount: Math.floor(Math.random() * 10000) + 1000,
				likeCount: Math.floor(Math.random() * 5000) + 500,
				copyCount: Math.floor(Math.random() * 2000) + 200,
				dislikeCount: Math.floor(Math.random() * 500) + 50,
			},
			status: 'active' as const,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			rank: startIndex + index + 1,
			analytics: {
				likesGained: Math.floor(Math.random() * 1000) + 100,
				copiesGained: Math.floor(Math.random() * 500) + 50,
				viewsGained: Math.floor(Math.random() * 2000) + 200,
				totalLikes: Math.floor(Math.random() * 5000) + 500,
				totalCopies: Math.floor(Math.random() * 2000) + 200,
				totalViews: Math.floor(Math.random() * 10000) + 1000,
				trendingScore: Math.random() * 100,
				timeFrame,
			},
			uploader: {
				_id: `user-${startIndex + index + 1}`,
				username: `User${startIndex + index + 1}`,
				displayName: `User ${startIndex + index + 1}`,
				avatarUrl: `https://picsum.photos/50/50?random=${
					startIndex + index + 100
				}`,
				followCount: Math.floor(Math.random() * 1000) + 100,
				followingCount: Math.floor(Math.random() * 500) + 50,
			},
		}));
	};

	return (
		<div className="container mx-auto px-3 py-4">
			{/* Header */}
			<div className="mb-6 text-center">
				<h1 className="mb-2 text-3xl font-bold text-indigo-800 dark:text-white">
					{t('trending.title')}
				</h1>
				<p className="text-base text-gray-600 dark:text-gray-300">
					{t('trending.subtitle')}
				</p>
			</div>

			{/* Mobile Tab Navigation - Only visible on small screens */}
			<div className="mb-4 md:hidden">
				<ATabs
					tabs={tabs}
					value={activeTab}
					onChange={(tab) => setActiveTab(tab as TrendingTimeFrame)}
				/>
			</div>

			{/* Mobile: Single Column (based on active tab) */}
			<div className="md:hidden">
				{activeTab === '24h' && (
					<OTrendingColumn
						timeFrame="24h"
						memes={trending24h}
						isLoading={loading24h}
						error={error24h}
						onRetry={() => handleRetry('24h')}
						addClass="h-fit"
					/>
				)}
				{activeTab === '1w' && (
					<OTrendingColumn
						timeFrame="1w"
						memes={trending1w}
						isLoading={loading1w}
						error={error1w}
						onRetry={() => handleRetry('1w')}
						addClass="h-fit"
					/>
				)}
				{activeTab === '1m' && (
					<OTrendingColumn
						timeFrame="1m"
						memes={trending1m}
						isLoading={loading1m}
						error={error1m}
						onRetry={() => handleRetry('1m')}
						addClass="h-fit"
					/>
				)}
			</div>

			{/* Desktop: Three Column Layout - Only visible on medium screens and up */}
			<div className="hidden gap-4 md:grid md:grid-cols-3 md:gap-6 lg:gap-12">
				{/* 24h Column */}
				<OTrendingColumn
					timeFrame="24h"
					memes={trending24h}
					isLoading={loading24h}
					error={error24h}
					onRetry={() => handleRetry('24h')}
					addClass="h-fit"
				/>

				{/* 1w Column */}
				<OTrendingColumn
					timeFrame="1w"
					memes={trending1w}
					isLoading={loading1w}
					error={error1w}
					onRetry={() => handleRetry('1w')}
					addClass="h-fit"
				/>

				{/* 1m Column */}
				<OTrendingColumn
					timeFrame="1m"
					memes={trending1m}
					isLoading={loading1m}
					error={error1m}
					onRetry={() => handleRetry('1m')}
					addClass="h-fit"
				/>
			</div>
		</div>
	);
};

export default Trending;
