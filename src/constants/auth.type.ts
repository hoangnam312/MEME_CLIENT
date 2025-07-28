// =====================
// Auth Response Types
// =====================
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
	createdAt: string; // ISO string
	updatedAt: string;
}

export interface EmailVerificationStatus {
	isVerified: boolean;
	verifiedAt?: string; // ISO string
}

export interface LoginResponse {
	_id: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
	emailVerification: EmailVerificationStatus;
	authentication: {
		token: string;
	};
}

export interface RegisterResponse {
	_id: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
}
