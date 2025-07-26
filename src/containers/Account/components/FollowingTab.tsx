import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { useAuthen } from 'src/hooks/useAuthen';
import { UserCardData } from 'src/hooks/useUserCard';

interface FollowingTabProps {
	onCountUpdate?: (newCount: number) => void;
}

// Mock data - replace with actual API call
const mockFollowing: UserCardData[] = [
	{
		avatarUrl: 'https://via.placeholder.com/80x80?text=User1',
		username: 'sarah_wilson',
		displayName: 'Sarah Wilson',
		followCount: 892,
		followingCount: 234,
		bio: 'Lifestyle blogger and meme connoisseur',
		joinDate: 'November 2022',
	},
	{
		avatarUrl: 'https://via.placeholder.com/80x80?text=User2',
		username: 'tech_guru',
		displayName: 'Tech Guru',
		followCount: 1234,
		followingCount: 567,
		bio: 'Tech enthusiast sharing the best tech memes',
		joinDate: 'August 2022',
	},
	{
		avatarUrl: 'https://via.placeholder.com/80x80?text=User3',
		username: 'meme_queen',
		displayName: 'Meme Queen',
		followCount: 2456,
		followingCount: 1023,
		bio: 'Queen of viral memes and internet culture',
		joinDate: 'June 2022',
	},
	{
		avatarUrl: 'https://via.placeholder.com/80x80?text=User4',
		username: 'daily_laughs',
		displayName: 'Daily Laughs',
		followCount: 345,
		followingCount: 178,
		bio: 'Bringing you daily doses of humor',
		joinDate: 'January 2023',
	},
	{
		avatarUrl: 'https://via.placeholder.com/80x80?text=User5',
		username: 'creative_mind',
		displayName: 'Creative Mind',
		followCount: 678,
		followingCount: 289,
		bio: 'Creative content creator and meme artist',
		joinDate: 'September 2022',
	},
];

const FollowingTab: React.FC<FollowingTabProps> = ({ onCountUpdate }) => {
	const { userId } = useAuthen();
	const [following, setFollowing] = useState<UserCardData[]>([]);
	const [filteredFollowing, setFilteredFollowing] = useState<UserCardData[]>(
		[]
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// TODO: Replace with actual API call
		const fetchFollowing = async () => {
			setIsLoading(true);
			try {
				// Simulate API delay
				setFollowing(mockFollowing);
				setFilteredFollowing(mockFollowing);
				// Update parent component with initial count
				onCountUpdate?.(mockFollowing.length);
			} catch (error) {
				console.error('Error fetching following:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFollowing();
	}, [userId, onCountUpdate]);

	useEffect(() => {
		const filtered = following.filter(
			(user) =>
				user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
				user.bio?.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredFollowing(filtered);
	}, [searchQuery, following]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
					<p className="mt-4 text-gray-600">{t('account.following.loading')}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-medium text-gray-900">
						{t('account.following.title')}
					</h3>
					<p className="text-sm text-gray-600">
						{t('account.following.subtitle', { count: following.length })}
					</p>
				</div>
			</div>

			{/* Search */}
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3">
					<FontAwesomeIcon icon={faSearch} className="text-gray-400" />
				</div>
				<input
					type="text"
					placeholder={t('account.following.searchPlaceholder')}
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>

			{/* Following List */}
			{filteredFollowing.length === 0 ? (
				<div className="py-12 text-center">
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
						<FontAwesomeIcon
							icon={faSearch}
							className="h-8 w-8 text-gray-400"
						/>
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900">
						{searchQuery
							? t('account.following.noResults')
							: t('account.following.empty')}
					</h3>
					<p className="text-gray-600">
						{searchQuery
							? t('account.following.noResultsDesc')
							: t('account.following.emptyDesc')}
					</p>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
					{filteredFollowing.map((user) => (
						<div
							key={user.username}
							className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
						>
							<div className="flex-1">
								<MUserCard
									variant="compact"
									user={user}
									enableFollowModal={false}
								/>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Stats */}
			{filteredFollowing.length > 0 && (
				<div className="border-t border-gray-200 pt-4">
					<div className="flex justify-between text-sm text-gray-600">
						<span>
							{t('account.following.showing', {
								count: filteredFollowing.length,
								total: following.length,
							})}
						</span>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className="text-indigo-600 hover:text-indigo-700"
							>
								{t('account.following.clearSearch')}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FollowingTab;
