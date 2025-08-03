import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';
import { UserCardData } from 'src/component/molecules/MUserCard/useUserCard';

// Follow relationship status for a specific user
export interface FollowRelationship {
	isFollowing: boolean;
	isFollowedBy: boolean;
	followedAt?: string;
}

// State for followers/following lists with pagination
export interface FollowList {
	users: UserCardData[];
	isLoading: boolean;
	isLoadingMore: boolean;
	hasNextPage: boolean;
	nextCursor?: string;
	totalCount: number;
	error: string | null;
	lastUpdated: number;
}

// Core state interface
interface TStateFollowSlice {
	// Current user's followers and following lists
	followers: FollowList;
	following: FollowList;

	// Follow relationships cache: userId -> relationship status
	relationships: Record<string, FollowRelationship>;

	// Optimistic updates tracking
	optimisticUpdates: Record<
		string,
		{
			action: 'follow' | 'unfollow';
			timestamp: number;
		}
	>;

	// Loading states for individual actions
	followActionLoading: Record<string, boolean>;
}

// Actions interface
interface TActionFollowSlice {
	// Followers management
	setFollowers: (followers: UserCardData[], reset?: boolean) => void;
	setFollowersLoading: (isLoading: boolean, isLoadingMore?: boolean) => void;
	setFollowersError: (error: string | null) => void;
	setFollowersPagination: (
		hasNextPage: boolean,
		nextCursor?: string,
		totalCount?: number
	) => void;

	// Following management
	setFollowing: (following: UserCardData[], reset?: boolean) => void;
	setFollowingLoading: (isLoading: boolean, isLoadingMore?: boolean) => void;
	setFollowingError: (error: string | null) => void;
	setFollowingPagination: (
		hasNextPage: boolean,
		nextCursor?: string,
		totalCount?: number
	) => void;

	// Relationship management
	setFollowRelationship: (
		userId: string,
		relationship: FollowRelationship
	) => void;
	batchSetFollowRelationships: (
		relationships: Record<string, FollowRelationship>
	) => void;

	// Follow actions with optimistic updates
	optimisticFollow: (userId: string, userData: UserCardData) => void;
	optimisticUnfollow: (userId: string) => void;
	confirmFollowAction: (
		userId: string,
		success: boolean,
		actualRelationship?: FollowRelationship
	) => void;

	// Follow action loading states
	setFollowActionLoading: (userId: string, isLoading: boolean) => void;

	// Utility functions
	clearFollowCache: () => void;
	removeUserFromFollowing: (userId: string) => void;
	updateUserCounts: (followersCount?: number, followingCount?: number) => void;
}

export type TFollowSlice = TStateFollowSlice & TActionFollowSlice;

const initialFollowList: FollowList = {
	users: [],
	isLoading: false,
	isLoadingMore: false,
	hasNextPage: false,
	nextCursor: undefined,
	totalCount: 0,
	error: null,
	lastUpdated: 0,
};

export const createFollow: StateCreator<TBoundStore, [], [], TFollowSlice> = (
	set
) => ({
	// Initial state
	followers: { ...initialFollowList },
	following: { ...initialFollowList },
	relationships: {},
	optimisticUpdates: {},
	followActionLoading: {},

	// Followers management
	setFollowers: (followers, reset = false) =>
		set(
			produce((draft: TBoundStore) => {
				if (reset) {
					draft.follow.followers.users = followers;
				} else {
					draft.follow.followers.users = [
						...draft.follow.followers.users,
						...followers,
					];
				}
				draft.follow.followers.lastUpdated = Date.now();
			})
		),

	setFollowersLoading: (isLoading, isLoadingMore = false) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.followers.isLoading = isLoading;
				draft.follow.followers.isLoadingMore = isLoadingMore;
			})
		),

	setFollowersError: (error) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.followers.error = error;
			})
		),

	setFollowersPagination: (hasNextPage, nextCursor, totalCount) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.followers.hasNextPage = hasNextPage;
				draft.follow.followers.nextCursor = nextCursor;
				if (totalCount !== undefined) {
					draft.follow.followers.totalCount = totalCount;
				}
			})
		),

	// Following management
	setFollowing: (following, reset = false) =>
		set(
			produce((draft: TBoundStore) => {
				if (reset) {
					draft.follow.following.users = following;
				} else {
					draft.follow.following.users = [
						...draft.follow.following.users,
						...following,
					];
				}
				draft.follow.following.lastUpdated = Date.now();
			})
		),

	setFollowingLoading: (isLoading, isLoadingMore = false) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.following.isLoading = isLoading;
				draft.follow.following.isLoadingMore = isLoadingMore;
			})
		),

	setFollowingError: (error) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.following.error = error;
			})
		),

	setFollowingPagination: (hasNextPage, nextCursor, totalCount) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.following.hasNextPage = hasNextPage;
				draft.follow.following.nextCursor = nextCursor;
				if (totalCount !== undefined) {
					draft.follow.following.totalCount = totalCount;
				}
			})
		),

	// Relationship management
	setFollowRelationship: (userId, relationship) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.relationships[userId] = relationship;
			})
		),

	batchSetFollowRelationships: (relationships) =>
		set(
			produce((draft: TBoundStore) => {
				Object.assign(draft.follow.relationships, relationships);
			})
		),

	// Optimistic follow actions
	optimisticFollow: (userId, userData) =>
		set(
			produce((draft: TBoundStore) => {
				// Add to optimistic updates
				draft.follow.optimisticUpdates[userId] = {
					action: 'follow',
					timestamp: Date.now(),
				};

				// Update relationship immediately
				draft.follow.relationships[userId] = {
					isFollowing: true,
					isFollowedBy:
						draft.follow.relationships[userId]?.isFollowedBy ?? false,
					followedAt: new Date().toISOString(),
				};

				// Add to following list if not already there
				const existsInFollowing = draft.follow.following.users.some(
					(u) => u.username === userId
				);
				if (!existsInFollowing) {
					draft.follow.following.users.unshift(userData);
					draft.follow.following.totalCount += 1;
				}

				// Update authen stats optimistically
				draft.authen.stats.followingCount += 1;
			})
		),

	optimisticUnfollow: (userId) =>
		set(
			produce((draft: TBoundStore) => {
				// Add to optimistic updates
				draft.follow.optimisticUpdates[userId] = {
					action: 'unfollow',
					timestamp: Date.now(),
				};

				// Update relationship immediately
				draft.follow.relationships[userId] = {
					isFollowing: false,
					isFollowedBy:
						draft.follow.relationships[userId]?.isFollowedBy ?? false,
				};

				// Remove from following list
				draft.follow.following.users = draft.follow.following.users.filter(
					(u) => u.username !== userId
				);
				draft.follow.following.totalCount = Math.max(
					0,
					draft.follow.following.totalCount - 1
				);

				// Update authen stats optimistically
				draft.authen.stats.followingCount = Math.max(
					0,
					draft.authen.stats.followingCount - 1
				);
			})
		),

	confirmFollowAction: (userId, success, actualRelationship) =>
		set(
			produce((draft: TBoundStore) => {
				const optimisticUpdate = draft.follow.optimisticUpdates[userId];

				if (optimisticUpdate) {
					delete draft.follow.optimisticUpdates[userId];

					if (!success) {
						// Revert optimistic update
						if (optimisticUpdate.action === 'follow') {
							// Revert follow
							if (actualRelationship) {
								draft.follow.relationships[userId] = actualRelationship;
							} else {
								draft.follow.relationships[userId] = {
									isFollowing: false,
									isFollowedBy:
										draft.follow.relationships[userId]?.isFollowedBy ?? false,
								};
							}
							// Remove from following list
							draft.follow.following.users =
								draft.follow.following.users.filter(
									(u) => u.username !== userId
								);
							draft.follow.following.totalCount = Math.max(
								0,
								draft.follow.following.totalCount - 1
							);
							draft.authen.stats.followingCount = Math.max(
								0,
								draft.authen.stats.followingCount - 1
							);
						} else {
							// Revert unfollow - add back
							if (actualRelationship) {
								draft.follow.relationships[userId] = actualRelationship;
							} else {
								draft.follow.relationships[userId] = {
									isFollowing: true,
									isFollowedBy:
										draft.follow.relationships[userId]?.isFollowedBy ?? false,
								};
							}
							draft.authen.stats.followingCount += 1;
						}
					} else if (actualRelationship) {
						// Update with actual relationship from server
						draft.follow.relationships[userId] = actualRelationship;
					}
				}
			})
		),

	// Follow action loading states
	setFollowActionLoading: (userId, isLoading) =>
		set(
			produce((draft: TBoundStore) => {
				if (isLoading) {
					draft.follow.followActionLoading[userId] = true;
				} else {
					delete draft.follow.followActionLoading[userId];
				}
			})
		),

	// Utility functions
	clearFollowCache: () =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.followers = { ...initialFollowList };
				draft.follow.following = { ...initialFollowList };
				draft.follow.relationships = {};
				draft.follow.optimisticUpdates = {};
				draft.follow.followActionLoading = {};
			})
		),

	removeUserFromFollowing: (userId) =>
		set(
			produce((draft: TBoundStore) => {
				draft.follow.following.users = draft.follow.following.users.filter(
					(u) => u.username !== userId
				);
				draft.follow.following.totalCount = Math.max(
					0,
					draft.follow.following.totalCount - 1
				);
				// Update authen stats
				draft.authen.stats.followingCount = Math.max(
					0,
					draft.authen.stats.followingCount - 1
				);
			})
		),

	updateUserCounts: (followersCount, followingCount) =>
		set(
			produce((draft: TBoundStore) => {
				if (followersCount !== undefined) {
					draft.authen.stats.followersCount = followersCount;
					draft.follow.followers.totalCount = followersCount;
				}
				if (followingCount !== undefined) {
					draft.authen.stats.followingCount = followingCount;
					draft.follow.following.totalCount = followingCount;
				}
			})
		),
});
