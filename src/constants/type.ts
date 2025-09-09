export interface IRestParameterAttribute {
	[key: string]: unknown;
}

export interface IMeme {
	_id: string;
	name: string;
	description?: string;
	tag?: string;
	location?: string;
	__v?: number;
	// Nested image structure
	image: {
		imageOrigin: string;
		imageMedium: string;
		imageSmall: string;
	};
	// Flat image properties for backward compatibility
	imageMedium: string;
	imageSmall: string;
	imageOrigin: string;
	userId: string;
	// Nested stats structure
	stats: {
		viewCount: number;
		likeCount: number;
		copyCount: number;
		dislikeCount: number;
	};
	// Flat stats properties for backward compatibility
	viewCount: number;
	likeCount: number;
	copyCount: number;
	dislikeCount: number;
	status: 'active' | 'pending' | 'flagged' | 'deleted';
	createdAt: string;
	updatedAt: string;
}

export interface ITrendingAnalytics {
	likesGained: number;
	copiesGained: number;
	viewsGained: number;
	totalLikes: number;
	totalCopies: number;
	totalViews: number;
	trendingScore: number;
	timeFrame: TrendingTimeFrame;
}

export interface ITrendingMeme extends IMeme {
	analytics: ITrendingAnalytics;
	uploader: {
		_id: string;
		username: string;
		displayName: string; // Add for display purposes
		avatarUrl: string;
		followCount: number;
		followingCount: number;
		verified?: boolean;
	};
	rank: number;
}

export type TrendingTimeFrame = '24h' | '1w' | '1m';

export interface ITrendingParams {
	timeFrame: TrendingTimeFrame;
	limit?: number;
	page?: number;
}

export interface ITrendingResponse {
	total: number;
	page: number;
	timeFrame: TrendingTimeFrame;
	data: ITrendingMeme[];
}

// Trending Users Types
export interface ITrendingUserAnalytics {
	followersGained: number;
	memesPosted: number;
	likesReceived: number;
	copiesReceived: number;
	viewsReceived: number;
	totalFollowers: number;
	totalLikes: number;
	totalMemes: number;
	totalCopies: number;
	totalViews: number;
	trendingScore: number;
	timeFrame: TrendingTimeFrame;
}

export interface ITrendingUser {
	_id: string;
	username: string;
	displayName: string; // Add for display purposes
	avatarUrl: string;
	bio?: string;
	verified?: boolean;
	followCount: number;
	followingCount: number;
	analytics: ITrendingUserAnalytics;
	rank: number;
}

export interface ITrendingUsersParams {
	timeFrame: TrendingTimeFrame;
	limit?: number;
	page?: number;
}

export interface ITrendingUsersResponse {
	total: number;
	page: number;
	timeFrame: TrendingTimeFrame;
	data: ITrendingUser[];
}

export enum StatusCopyImage {
	SUCCESS,
	FAIL,
	UN_COPY,
}

export enum typeModal {
	QUICK_UPLOAD,
	UPLOAD,
	NONE,
}

export enum Path {
	HOME_PAGE = '/',
	MY_MEME = '/my-meme',
	BULK_UPLOAD = '/bulk-upload',
	TRENDING = '/trending',
	TRENDING_USERS = '/trending-users',
	ACCOUNT = '/account',
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT_PASSWORD = '/forgot-password',
	VERIFY_EMAIL = '/verify-email',
	SERVER_ERROR = '/sever-error',
}

export type ErrorResponse = {
	message: string;
};

export interface TypeParams {
	search?: string;
	limit?: number;
	page?: number;
}

export interface InterfaceId {
	id?: string;
}

export interface IParamsGetListCursor {
	limit?: number;
	lastScore?: number;
	lastId?: number;
}

export interface IResponseGetListCursor<T> {
	limit: number;
	lastScore: number;
	lastId: number;
	isEnd: boolean;
	data: T[];
}

export type SupportedLanguages = 'en' | 'vi';
