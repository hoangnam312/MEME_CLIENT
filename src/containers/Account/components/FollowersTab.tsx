import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import AButton from 'src/component/atoms/AButton/AButton';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { UserCardData } from 'src/hooks/useUserCard';
import { useAuthen } from 'src/hooks/useAuthen';

interface FollowersTabProps {
	onCountUpdate?: (newCount: number) => void;
}

const mockFollowers: UserCardData[] = [
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1746097118489_blob',
		username: 'john_doe',
		displayName: 'John Doe',
		followCount: 150,
		followingCount: 89,
		bio: 'Meme enthusiast and content creator',
		joinDate: 'January 2023',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1747739691303_image.png',
		username: 'jane_smith',
		displayName: 'Jane Smith',
		followCount: 234,
		followingCount: 156,
		bio: 'Digital artist and meme lover',
		joinDate: 'March 2023',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1746101012673_image.png',
		username: 'meme_master',
		displayName: 'Meme Master',
		followCount: 567,
		followingCount: 234,
		bio: 'Professional meme curator',
		joinDate: 'December 2022',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1746097027485_blob',
		username: 'funny_guy',
		displayName: 'Funny Guy',
		followCount: 89,
		followingCount: 67,
		bio: 'Making people laugh one meme at a time',
		joinDate: 'February 2023',
	},
];

const FollowersTab: React.FC<FollowersTabProps> = ({ onCountUpdate }) => {
	const { userId } = useAuthen();
	const [followers, setFollowers] = useState<UserCardData[]>([]);
	const [filteredFollowers, setFilteredFollowers] = useState<UserCardData[]>(
		[]
	);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	// Mock data - replace with actual API call

	useEffect(() => {
		// TODO: Replace with actual API call
		const fetchFollowers = async () => {
			setIsLoading(true);
			try {
				// Simulate API delay
				setFollowers(mockFollowers);
				setFilteredFollowers(mockFollowers);
				// Update parent component with initial count
				onCountUpdate?.(mockFollowers.length);
			} catch (error) {
				console.error('Error fetching followers:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFollowers();
	}, [userId, onCountUpdate]);

	useEffect(() => {
		const filtered = followers.filter(
			(follower) =>
				follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
				follower.bio?.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredFollowers(filtered);
	}, [searchQuery, followers]);

	const handleRemoveFollower = async (username: string) => {
		try {
			// TODO: Replace with actual API call
			console.log('Removing follower:', username);

			const updatedFollowers = followers.filter((f) => f.username !== username);
			setFollowers(updatedFollowers);
			setFilteredFollowers(
				updatedFollowers.filter(
					(follower) =>
						follower.username
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						follower.bio?.toLowerCase().includes(searchQuery.toLowerCase())
				)
			);

			// Update parent component with new count
			onCountUpdate?.(updatedFollowers.length);
		} catch (error) {
			console.error('Error removing follower:', error);
		}
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
					<p className="mt-4 text-gray-600">{t('account.followers.loading')}</p>
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
						{t('account.followers.title')}
					</h3>
					<p className="text-sm text-gray-600">
						{t('account.followers.subtitle', { count: followers.length })}
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
					placeholder={t('account.followers.searchPlaceholder')}
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
			</div>

			{/* Followers List */}
			{filteredFollowers.length === 0 ? (
				<div className="py-12 text-center">
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
						<FontAwesomeIcon
							icon={faSearch}
							className="h-8 w-8 text-gray-400"
						/>
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900">
						{searchQuery
							? t('account.followers.noResults')
							: t('account.followers.empty')}
					</h3>
					<p className="text-gray-600">
						{searchQuery
							? t('account.followers.noResultsDesc')
							: t('account.followers.emptyDesc')}
					</p>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
					{filteredFollowers.map((follower) => (
						<div
							key={follower.username}
							className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
						>
							<div className="flex-1">
								<MUserCard
									variant="compact"
									user={follower}
									enableFollowModal={false}
								/>
							</div>
							<div className="ml-4">
								<AButton
									content={t('account.followers.remove')}
									addClass="!bg-red-100 !text-red-700 hover:!bg-red-200 !border-red-200"
									onClick={() => handleRemoveFollower(follower.username)}
								/>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Stats */}
			{filteredFollowers.length > 0 && (
				<div className="border-t border-gray-200 pt-4">
					<div className="flex justify-between text-sm text-gray-600">
						<span>
							{t('account.followers.showing', {
								count: filteredFollowers.length,
								total: followers.length,
							})}
						</span>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className="text-indigo-600 hover:text-indigo-700"
							>
								{t('account.followers.clearSearch')}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FollowersTab;
