import React, { useState, useEffect, useCallback, useRef } from 'react';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import AButton from 'src/component/atoms/AButton/AButton';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';
import { useBoundStore } from 'src/store/store';

interface FollowersTabProps {
	fetchFollowers: (cursor?: string, reset?: boolean) => Promise<void>;
}

const FollowersTab: React.FC<FollowersTabProps> = ({ fetchFollowers }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredFollowers, setFilteredFollowers] = useState<UserCardData[]>(
		[]
	);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const lastElementRef = useRef<HTMLDivElement | null>(null);

	// Get state from follow slice
	const { followers: followersState } = useBoundStore((state) => state.follow);

	const {
		users: followers,
		isLoading,
		isLoadingMore,
		hasNextPage,
		nextCursor,
		totalCount,
		error,
	} = followersState;

	// Client-side search filtering
	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredFollowers(followers);
		} else {
			const filtered = followers.filter(
				(follower) =>
					follower.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
					follower.displayName
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					follower.bio?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredFollowers(filtered);
		}
	}, [searchQuery, followers]);

	// Infinite scroll functionality
	const loadMoreFollowers = useCallback(() => {
		if (hasNextPage && !isLoadingMore && !isLoading && nextCursor) {
			fetchFollowers(nextCursor, false);
		}
	}, [hasNextPage, isLoadingMore, isLoading, nextCursor, fetchFollowers]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target.isIntersecting) {
					loadMoreFollowers();
				}
			},
			{ threshold: 1.0 }
		);

		if (lastElementRef.current) {
			observerRef.current.observe(lastElementRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [loadMoreFollowers]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	if (isLoading && followers.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
					<p className="mt-4 text-gray-600">{t('account.followers.loading')}</p>
				</div>
			</div>
		);
	}

	if (error && followers.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
						<FontAwesomeIcon icon={faSearch} className="h-8 w-8 text-red-400" />
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900">
						{t('account.followers.errorTitle')}
					</h3>
					<p className="mb-4 text-gray-600">{error}</p>
					<AButton
						content={t('account.followers.retry')}
						onClick={() => fetchFollowers(undefined, true)}
					/>
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
						{t('account.followers.subtitle', { count: totalCount })}
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
				<div className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
						{filteredFollowers.map((follower, index) => (
							<div
								key={follower.username}
								className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
								ref={
									index === filteredFollowers.length - 1 ? lastElementRef : null
								}
							>
								<div className="flex-1">
									<MUserCard
										variant="compact"
										user={follower}
										enableFollowModal={false}
									/>
								</div>
							</div>
						))}
					</div>

					{/* Loading more indicator */}
					{isLoadingMore && (
						<div className="flex items-center justify-center py-4">
							<div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600"></div>
							<p className="ml-2 text-sm text-gray-600">
								{t('account.followers.loadingMore')}
							</p>
						</div>
					)}

					{/* End of results indicator */}
					{!hasNextPage && filteredFollowers.length > 0 && (
						<div className="flex items-center justify-center py-4">
							<p className="text-sm text-gray-500">
								{t('account.followers.endOfResults')}
							</p>
						</div>
					)}
				</div>
			)}

			{/* Stats */}
			{filteredFollowers.length > 0 && (
				<div className="border-t border-gray-200 pt-4">
					<div className="flex justify-between text-sm text-gray-600">
						<span>
							{t('account.followers.showing', {
								count: filteredFollowers.length,
								total: totalCount,
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
