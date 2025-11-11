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
	image: {
		imageOrigin: string;
		imageMedium: string;
		imageSmall: string;
	};
	userId: string;
	stats: {
		viewCount: number;
		likeCount: number;
		copyCount: number;
		dislikeCount: number;
	};
	viewCount: number;
	likeCount: number;
	copyCount: number;
	dislikeCount: number;
	status: 'active' | 'pending' | 'flagged' | 'deleted';
	createdAt: string;
	updatedAt: string;
	creator?: {
		_id: string;
		username: string;
		displayName?: string;
		avatarUrl?: string;
		followCount: number;
		followingCount: number;
	};
	hasLiked?: boolean;
	hasDisliked?: boolean;
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

// Backend API uses these period values
export type TrendingPeriod = '12h' | '24h' | '3d' | '7d' | '1m';

// Map frontend timeframe to backend period
export const TIMEFRAME_TO_PERIOD_MAP: Record<
	TrendingTimeFrame,
	TrendingPeriod
> = {
	'24h': '24h',
	'1w': '7d',
	'1m': '1m',
};

export interface ITrendingParams {
	period?: TrendingPeriod;
	limit?: number;
	cursor?: string;
}

export interface ITrendingPagination {
	limit: number;
	hasMore: boolean;
	nextCursor?: string;
	totalCount: number;
}

export interface ITrendingMemeData {
	_id: string;
	memeId: string;
	period: TrendingPeriod;
	rank: number;
	interactionCount: number;
	viewCount: number;
	likeCount: number;
	copyCount: number;
	dislikeCount: number;
	score: number;
	periodStart: string;
	periodEnd: string;
	generatedAt: string;
	meme: IMeme;
}

export interface ITrendingResponse {
	success: boolean;
	period: TrendingPeriod;
	pagination: ITrendingPagination;
	data: ITrendingMemeData[];
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
