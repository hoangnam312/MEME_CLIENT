import { SupportedLanguages } from 'src/constants/type';
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
	contentLanguage: 'en' | 'vi';
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

export interface UpdatePreferencesPayload {
	contentLanguage?: SupportedLanguages;
}

export interface UpdatePreferencesResponse {
	_id: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
}

export interface DeleteAccountResponse {
	message: string;
}

export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}

export interface ChangePasswordResponse {
	message: string;
	success: boolean;
}

// API functions
export const getMyProfile = () => api.get<MyProfileResponse>('/users/me');

export const updateProfile = (payload: UpdateProfilePayload | FormData) => {
	// Check if payload is FormData (contains avatar file) or regular object
	if (payload instanceof FormData) {
		return api.put<UpdateProfileResponse>('/users/me/profile', payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} else {
		return api.put<UpdateProfileResponse>('/users/me/profile', payload);
	}
};

export const updatePreferences = (payload: UpdatePreferencesPayload) =>
	api.put<UpdatePreferencesResponse>('/users/me/preferences', payload);

export const changePassword = (payload: ChangePasswordPayload) =>
	api.post<ChangePasswordResponse>('/users/me/change-password', payload);

export const deleteAccount = () =>
	api.delete<DeleteAccountResponse>('/users/me');
