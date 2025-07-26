export interface IRestParameterAttribute {
	[key: string]: unknown;
}

export interface IImage {
	_id: string;
	name?: string;
	description?: string;
	tag?: string;
	userId: string;
	location: string;
	__v: number;
	imageMedium: string;
	imageSmall: string;
	viewCount: number;
	likeCount: number;
	copyCount: number;
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

export interface ITrendingMeme extends IImage {
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
	TRENDING = '/trending',
	TRENDING_USERS = '/trending-users',
	ACCOUNT = '/account',
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT_PASSWORD = '/forgot-password',
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
