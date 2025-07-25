import api from './config';

// Types based on backend API structure
export interface UserProfile {
	displayName?: string;
	bio?: string;
	avatar?: string;
}

export interface UserStats {
	followersCount: number;
	followingCount: number;
	memesCount: number;
}

export interface UserPreferences {
	contentLanguage: string;
}

export interface UserTimestamps {
	createdAt: string;
	updatedAt: string;
}

export interface MyProfileResponse {
	_id: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
}

export interface UpdateProfilePayload {
	displayName?: string;
	bio?: string;
	avatar?: string;
}

export interface UpdateProfileResponse {
	_id: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
}

// API functions
export const getMyProfile = () => api.get<MyProfileResponse>('/users/me');

export const updateProfile = (payload: UpdateProfilePayload) =>
	api.put<UpdateProfileResponse>('/users/me/profile', payload);

export const updatePreferences = (payload: { contentLanguage?: string }) =>
	api.put<UpdateProfileResponse>('/users/me/preferences', payload);
