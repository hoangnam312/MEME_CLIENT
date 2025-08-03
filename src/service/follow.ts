import api from './config';

// Types based on backend API structure and UserCardData interface
export interface FollowUser {
	_id: string;
	username: string;
	profile?: {
		displayName?: string;
		bio?: string;
		avatar?: string;
	};
	stats: {
		followersCount: number;
		followingCount: number;
		memesCount: number;
	};
	timestamps: {
		createdAt: string;
		updatedAt: string;
	};
}

export interface FollowersResponse {
	data: FollowUser[];
	hasNextPage: boolean;
	nextCursor?: string;
}

export interface FollowingResponse {
	data: FollowUser[];
	hasNextPage: boolean;
	nextCursor?: string;
}

export interface FollowStatusResponse {
	isFollowing: boolean;
	followedAt?: string;
}

export interface BatchFollowStatusRequest {
	userIds: string[];
}

export interface BatchFollowStatusResponse {
	followStatus: {
		[userId: string]: {
			isFollowing: boolean;
			isFollowedBy: boolean;
		};
	};
}

export interface FollowCountResponse {
	count: number;
}

export interface SuggestedUsersResponse {
	data: (FollowUser & { followerCount: number })[];
	total: number;
}

export interface FollowActionResponse {
	message: string;
	success: boolean;
	follow: {
		_id: string;
		followerId: string;
		followeeId: string;
		followedAt: string;
	};
}

export interface UnfollowActionResponse {
	message: string;
	success: boolean;
}

export interface PaginationParams {
	limit?: number;
	cursor?: string;
}

// API functions for follow system
export const getFollowers = (userId: string, params?: PaginationParams) =>
	api.get<FollowersResponse>(`/users/${userId}/followers`, { params });

export const getFollowing = (userId: string, params?: PaginationParams) =>
	api.get<FollowingResponse>(`/users/${userId}/following`, { params });

export const followUser = (userId: string) =>
	api.post<FollowActionResponse>(`/users/${userId}/follow`);

export const unfollowUser = (userId: string) =>
	api.delete<UnfollowActionResponse>(`/users/${userId}/unfollow`);

export const getFollowStatus = (userId: string) =>
	api.get<FollowStatusResponse>(`/users/${userId}/follow-status`);

export const getMyFollowerCount = () =>
	api.get<FollowCountResponse>('/users/me/followers/count');

export const getMyFollowingCount = () =>
	api.get<FollowCountResponse>('/users/me/following/count');

export const getBatchFollowStatus = (payload: BatchFollowStatusRequest) =>
	api.post<BatchFollowStatusResponse>('/users/batch-follow-status', payload);

export const getSuggestedUsers = (params?: PaginationParams) =>
	api.get<SuggestedUsersResponse>('/users/suggested-follows', { params });

// Helper function to transform FollowUser to UserCardData
export const transformFollowUserToUserCardData = (user: FollowUser) => ({
	id: user._id,
	avatarUrl: user.profile?.avatar || '',
	username: user.username,
	displayName: user.profile?.displayName || user.username,
	followCount: user.stats.followersCount,
	followingCount: user.stats.followingCount,
	bio: user.profile?.bio,
	joinDate: new Date(user.timestamps.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
	}),
});
