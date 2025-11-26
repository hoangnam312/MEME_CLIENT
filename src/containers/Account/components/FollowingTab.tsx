import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import AButton from 'src/component/atoms/AButton/AButton';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';
import { useBoundStore } from 'src/store/store';

interface FollowingTabProps {
	fetchFollowing: (cursor?: string, reset?: boolean) => Promise<void>;
}

const FollowingTab: React.FC<FollowingTabProps> = ({ fetchFollowing }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredFollowing, setFilteredFollowing] = useState<UserCardData[]>(
		[]
	);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const lastElementRef = useRef<HTMLDivElement | null>(null);

	// Get state from follow slice
	const { following: followingState } = useBoundStore((state) => state.follow);

	const {
		users: following,
		isLoading,
		isLoadingMore,
		hasNextPage,
		nextCursor,
		totalCount,
		error,
	} = followingState;

	// Client-side search filtering
	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredFollowing(following);
		} else {
			const filtered = following.filter(
				(user) =>
					user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.bio?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredFollowing(filtered);
		}
	}, [searchQuery, following]);

	// Infinite scroll functionality
	const loadMoreFollowing = useCallback(() => {
		if (hasNextPage && !isLoadingMore && !isLoading && nextCursor) {
			fetchFollowing(nextCursor, false);
		}
	}, [hasNextPage, isLoadingMore, isLoading, nextCursor, fetchFollowing]);

	// Intersection Observer for infinite scroll
	useEffect(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target.isIntersecting) {
					loadMoreFollowing();
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
	}, [loadMoreFollowing]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	if (isLoading && following.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-800 dark:border-t-indigo-400"></div>
					<p className="mt-4 text-gray-600 dark:text-gray-400">
						{t('account.following.loading')}
					</p>
				</div>
			</div>
		);
	}

	if (error && following.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
						<FontAwesomeIcon
							icon={faSearch}
							className="h-8 w-8 text-red-400 dark:text-red-500"
						/>
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
						{t('account.following.errorTitle')}
					</h3>
					<p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
					<AButton
						content={t('account.following.retry')}
						onClick={() => fetchFollowing(undefined, true)}
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
					<h3 className="text-lg font-medium text-gray-900 dark:text-white">
						{t('account.following.title')}
					</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{t('account.following.subtitle', { count: totalCount })}
					</p>
				</div>
			</div>

			{/* Search */}
			<div className="relative">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3">
					<FontAwesomeIcon
						icon={faSearch}
						className="text-gray-400 dark:text-gray-500"
					/>
				</div>
				<input
					type="text"
					placeholder={t('account.following.searchPlaceholder')}
					value={searchQuery}
					onChange={handleSearchChange}
					className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
				/>
			</div>

			{/* Following List */}
			{filteredFollowing.length === 0 ? (
				<div className="py-12 text-center">
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
						<FontAwesomeIcon
							icon={faSearch}
							className="h-8 w-8 text-gray-400 dark:text-gray-500"
						/>
					</div>
					<h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
						{searchQuery
							? t('account.following.noResults')
							: t('account.following.empty')}
					</h3>
					<p className="text-gray-600 dark:text-gray-400">
						{searchQuery
							? t('account.following.noResultsDesc')
							: t('account.following.emptyDesc')}
					</p>
				</div>
			) : (
				<div className="space-y-4">
					<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
						{filteredFollowing.map((user, index) => (
							<div
								key={user.username}
								className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
								ref={
									index === filteredFollowing.length - 1 ? lastElementRef : null
								}
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

					{/* Loading more indicator */}
					{isLoadingMore && (
						<div className="flex items-center justify-center py-4">
							<div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-800 dark:border-t-indigo-400"></div>
							<p className="ml-2 text-sm text-gray-600 dark:text-gray-400">
								{t('account.following.loadingMore')}
							</p>
						</div>
					)}

					{/* End of results indicator */}
					{!hasNextPage && filteredFollowing.length > 0 && (
						<div className="flex items-center justify-center py-4">
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{t('account.following.endOfResults')}
							</p>
						</div>
					)}
				</div>
			)}

			{/* Stats */}
			{filteredFollowing.length > 0 && (
				<div className="border-t border-gray-200 pt-4 dark:border-gray-700">
					<div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
						<span>
							{t('account.following.showing', {
								count: filteredFollowing.length,
								total: totalCount,
							})}
						</span>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
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
