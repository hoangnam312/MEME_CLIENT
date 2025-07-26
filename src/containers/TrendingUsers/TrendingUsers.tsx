import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import OTrendingUsersColumn from 'src/containers/TrendingUsers/component/OTrendingUsersColumn/OTrendingUsersColumn';
import ATabs, { TabItem } from 'src/component/atoms/ATabs/ATabs';
import { ITrendingUser, TrendingTimeFrame } from 'src/constants/type';
import { getTrendingUsers } from 'src/service/meme';

const TrendingUsers: React.FC = () => {
	// State for each time frame column
	const [trending24h, setTrending24h] = useState<ITrendingUser[]>([]);
	const [trending1w, setTrending1w] = useState<ITrendingUser[]>([]);
	const [trending1m, setTrending1m] = useState<ITrendingUser[]>([]);

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
			label: t('trendingUsers.tabs.24h'),
		},
		{
			key: '1w',
			label: t('trendingUsers.tabs.1w'),
		},
		{
			key: '1m',
			label: t('trendingUsers.tabs.1m'),
		},
	];

	// Fetch trending users for a specific time frame
	const fetchTrendingUsers = async (
		timeFrame: TrendingTimeFrame,
		selectedPage = 1,
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

			const response = await getTrendingUsers({
				timeFrame,
				page: selectedPage,
				limit: 15, // Increased limit for better space utilization
			});

			if (response.data.data) {
				// Add rank to each user based on their position
				const usersWithRank = response.data.data.map((user, index) => ({
					...user,
					rank: (selectedPage - 1) * 15 + index + 1,
				}));

				// Update state for specific time frame
				if (timeFrame === '24h') {
					if (append) {
						setTrending24h((prev) => [...prev, ...usersWithRank]);
					} else {
						setTrending24h(usersWithRank);
					}
				} else if (timeFrame === '1w') {
					if (append) {
						setTrending1w((prev) => [...prev, ...usersWithRank]);
					} else {
						setTrending1w(usersWithRank);
					}
				} else if (timeFrame === '1m') {
					if (append) {
						setTrending1m((prev) => [...prev, ...usersWithRank]);
					} else {
						setTrending1m(usersWithRank);
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
			console.error(`Error fetching trending users for ${timeFrame}:`, err);

			// Set error for specific time frame
			if (timeFrame === '24h') setError24h(t('trendingUsers.error'));
			else if (timeFrame === '1w') setError1w(t('trendingUsers.error'));
			else if (timeFrame === '1m') setError1m(t('trendingUsers.error'));

			// Generate mock data for development
			if (process.env.NODE_ENV === 'development') {
				const mockUsers = generateMockUsers(timeFrame, selectedPage);
				if (timeFrame === '24h')
					setTrending24h(
						append ? (prev) => [...prev, ...mockUsers] : mockUsers
					);
				else if (timeFrame === '1w')
					setTrending1w(append ? (prev) => [...prev, ...mockUsers] : mockUsers);
				else if (timeFrame === '1m')
					setTrending1m(append ? (prev) => [...prev, ...mockUsers] : mockUsers);
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
		fetchTrendingUsers(timeFrame, 1, false);
	};

	// Initial load for all time frames
	useEffect(() => {
		fetchTrendingUsers('24h');
		fetchTrendingUsers('1w');
		fetchTrendingUsers('1m');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Mock data generator for development
	const generateMockUsers = (
		timeFrame: TrendingTimeFrame,
		page: number
	): ITrendingUser[] => {
		const startIndex = (page - 1) * 15;
		return Array.from({ length: 15 }, (_, index) => ({
			_id: `trending-user-${timeFrame}-${startIndex + index + 1}`,
			username: `TrendingUser${startIndex + index + 1}`,
			displayName: `Trending User ${startIndex + index + 1}`,
			avatarUrl: `https://picsum.photos/100/100?random=${
				startIndex + index + 200
			}`,
			bio: `I'm a trending ${timeFrame} user who creates amazing memes!`,
			verified: startIndex + index < 3,
			followCount: Math.floor(Math.random() * 10000) + 1000,
			followingCount: Math.floor(Math.random() * 1000) + 100,
			rank: startIndex + index + 1,
			analytics: {
				followersGained: Math.floor(Math.random() * 500) + 50,
				memesPosted: Math.floor(Math.random() * 20) + 5,
				likesReceived: Math.floor(Math.random() * 5000) + 500,
				copiesReceived: Math.floor(Math.random() * 1000) + 100,
				viewsReceived: Math.floor(Math.random() * 3000) + 300,
				totalFollowers: Math.floor(Math.random() * 10000) + 1000,
				totalLikes: Math.floor(Math.random() * 50000) + 5000,
				totalMemes: Math.floor(Math.random() * 100) + 20,
				totalCopies: Math.floor(Math.random() * 10000) + 1000,
				totalViews: Math.floor(Math.random() * 20000) + 2000,
				trendingScore: Math.random() * 100,
				timeFrame,
			},
		}));
	};

	return (
		<div className="container mx-auto px-3 py-4">
			{/* Header */}
			<div className="mb-6 text-center">
				<h1 className="mb-2 text-3xl font-bold text-indigo-800 dark:text-white">
					{t('trendingUsers.title')}
				</h1>
				<p className="text-base text-gray-600 dark:text-gray-300">
					{t('trendingUsers.subtitle')}
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
					<OTrendingUsersColumn
						timeFrame="24h"
						users={trending24h}
						isLoading={loading24h}
						error={error24h}
						onRetry={() => handleRetry('24h')}
						addClass="h-fit"
					/>
				)}
				{activeTab === '1w' && (
					<OTrendingUsersColumn
						timeFrame="1w"
						users={trending1w}
						isLoading={loading1w}
						error={error1w}
						onRetry={() => handleRetry('1w')}
						addClass="h-fit"
					/>
				)}
				{activeTab === '1m' && (
					<OTrendingUsersColumn
						timeFrame="1m"
						users={trending1m}
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
				<OTrendingUsersColumn
					timeFrame="24h"
					users={trending24h}
					isLoading={loading24h}
					error={error24h}
					onRetry={() => handleRetry('24h')}
					addClass="h-fit"
				/>

				{/* 1w Column */}
				<OTrendingUsersColumn
					timeFrame="1w"
					users={trending1w}
					isLoading={loading1w}
					error={error1w}
					onRetry={() => handleRetry('1w')}
					addClass="h-fit"
				/>

				{/* 1m Column */}
				<OTrendingUsersColumn
					timeFrame="1m"
					users={trending1m}
					isLoading={loading1m}
					error={error1m}
					onRetry={() => handleRetry('1m')}
					addClass="h-fit"
				/>
			</div>
		</div>
	);
};

export default TrendingUsers;
