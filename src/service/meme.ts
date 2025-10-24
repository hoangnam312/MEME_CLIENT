import {
	IMeme,
	TypeParams,
	InterfaceId,
	IParamsGetListCursor,
	IResponseGetListCursor,
	ITrendingParams,
	ITrendingResponse,
	ITrendingUsersParams,
	ITrendingUsersResponse,
} from 'src/constants/type';
import api from './config';

const authen = JSON.parse(localStorage.getItem('authen') ?? '{}');

interface InterfacePayloadCreateMeme {
	name?: string;
	link?: string;
	description?: string;
	image?: string;
}

interface InterfaceParamsGetMemes extends TypeParams {
	userId?: string;
}

interface InterfaceResponseGetMemes {
	total: number;
	page: number;
	data: IMeme[];
}

interface IBodyTrackingMeme {
	memeId: string;
	action: 'like' | 'copy' | 'view' | 'dislike' | 'add-to-album';
}

enum ESourceType {
	Feed = 'feed',
	Detail = 'detail',
	Search = 'search',
	Trending = 'trending',
	UserProfile = 'user_profile',
	Other = 'other',
}

interface IMetadataTrackingMeme {
	viewDuration?: number;
	sourceType?: ESourceType;
}

interface IParamsGetRecommendMemesByImage extends IParamsGetListCursor {
	imageId: string;
}

interface IRecommendationParams {
	limit?: number;
	cursor?: string;
}

interface IRecommendationPagination {
	hasNext: boolean;
	nextCursor: string | null;
	total?: number;
}

interface IRecommendationResponse {
	data: IMeme[];
	pagination: IRecommendationPagination;
}

interface IRandomRecommendationParams {
	limit?: number;
	excludeViewed?: boolean;
	category?: string;
}

interface IRandomMemeItem {
	_id: string;
	name: string;
	description?: string;
	image: {
		imageOrigin: string;
		imageMedium: string;
		imageSmall: string;
	};
	userId: string;
	imageAnalysis?: {
		tags: string[];
		captions: string[];
		text: string[];
	};
	stats: {
		viewCount: number;
		likeCount: number;
		copyCount: number;
		dislikeCount: number;
	};
	status: string;
	createdAt: string;
	updatedAt: string;
}

interface IRandomRecommendationResponse {
	success: boolean;
	data: {
		memes: IRandomMemeItem[];
		count: number;
		totalAvailable: number;
		timestamp: string;
	};
}

const createMeme = (payload: FormData) =>
	api.post('/meme', payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

const getMemes = (params?: InterfaceParamsGetMemes) =>
	api.get<InterfaceResponseGetMemes>('/meme', { params });

const deleteMeme = (params?: InterfaceId) =>
	api.delete<InterfaceResponseGetMemes>(`/meme/${params?.id}`);

// Legacy recommendation endpoint (to be deprecated)
const getRecommendMemesLegacy = (params?: IParamsGetListCursor) =>
	api.get<IResponseGetListCursor<IMeme>>('/meme/recommend', { params });

// New recommendation endpoint with cursor pagination
const getRecommendMemes = (params?: IRecommendationParams) =>
	api.get<IRecommendationResponse>('/recommend', { params });

const getRecommendMemesByImage = (params?: IParamsGetRecommendMemesByImage) =>
	api.get<IResponseGetListCursor<IMeme>>('/meme/recommend/by-image', {
		params,
	});

const trackingMeme = (
	body?: IBodyTrackingMeme,
	metadata?: IMetadataTrackingMeme
) =>
	api.post(`/user-action`, {
		...body,
		metadata: {
			...metadata,
			deviceType:
				window.innerWidth < 768
					? 'mobile'
					: window.innerWidth < 1024
					? 'tablet'
					: 'desktop',
			userPreferences: {
				language: authen?.preferences?.contentLanguage || 'en',
			},
		},
	});

const getTrendingMemes = (params?: ITrendingParams) =>
	api.get<ITrendingResponse>('/meme/trending', { params });

const getTrendingUsers = (params?: ITrendingUsersParams) =>
	api.get<ITrendingUsersResponse>('/users/trending', { params });

interface IFrequentMeme extends IMeme {
	point: number;
	interactions: {
		views: number;
		likes: number;
		copies: number;
		dislikes: number;
	};
}

interface IGetFrequentMemesParams {
	limit?: number;
	lastPoint?: number;
	lastMemeId?: string;
}

interface IGetFrequentMemesResponse {
	total: number;
	data: IFrequentMeme[];
	hasNext: boolean;
	nextCursor: {
		lastPoint: number;
		lastMemeId: string;
	} | null;
}

interface IGetUserMemesParams {
	search?: string;
	limit?: number;
	lastId?: string;
	lastCreatedAt?: string;
	sortBy?: 'createdAt' | 'viewCount' | 'likeCount' | 'copyCount';
	sortOrder?: 'asc' | 'desc';
	status?: 'active' | 'pending' | 'flagged' | 'deleted';
}

interface IUserInfo {
	_id: string;
	username: string;
	displayName?: string;
	avatar?: string;
}

interface IGetUserMemesResponse {
	total: number;
	data: IMeme[];
	hasNext: boolean;
	nextCursor: {
		lastId: string;
		lastCreatedAt: string;
	} | null;
	user?: IUserInfo;
}

const getUserFrequentMemes = (
	userId: string,
	params?: IGetFrequentMemesParams
) =>
	api.get<IGetFrequentMemesResponse>(`/user/meme/frequent/${userId}`, {
		params,
	});

const getUserMemes = (userId: string, params?: IGetUserMemesParams) =>
	api.get<IGetUserMemesResponse>(`/meme/user/${userId}`, { params });

const getRandomRecommendMemes = (params?: IRandomRecommendationParams) =>
	api.get<IRandomRecommendationResponse>('/meme/recommend/random', {
		params,
	});

interface IRecommendationFeedParams {
	limit?: number;
}

interface IRecommendationFeedItem extends IRandomMemeItem {
	recommendationSource?: string;
}

interface IRecommendationFeedResponse {
	success: boolean;
	data: {
		recommendations: IRecommendationFeedItem[];
		sources: Record<string, number>;
		total: number;
		hasMore: boolean;
	};
}

const getRecommendationFeed = (params?: IRecommendationFeedParams) =>
	api.get<IRecommendationFeedResponse>('/recommendation-feed', { params });

export {
	createMeme,
	getMemes,
	deleteMeme,
	getRecommendMemes,
	getRecommendMemesLegacy,
	trackingMeme,
	getRecommendMemesByImage,
	getTrendingMemes,
	getTrendingUsers,
	getUserFrequentMemes,
	getUserMemes,
	getRandomRecommendMemes,
	getRecommendationFeed,
	ESourceType,
};
export type {
	InterfacePayloadCreateMeme,
	InterfaceParamsGetMemes,
	InterfaceResponseGetMemes,
	IBodyTrackingMeme,
	IParamsGetRecommendMemesByImage,
	IRecommendationParams,
	IRecommendationResponse,
	IRecommendationPagination,
	IFrequentMeme,
	IGetFrequentMemesParams,
	IGetFrequentMemesResponse,
	IGetUserMemesParams,
	IGetUserMemesResponse,
	IUserInfo,
	IRandomRecommendationParams,
	IRandomRecommendationResponse,
	IRandomMemeItem,
	IRecommendationFeedParams,
	IRecommendationFeedResponse,
	IRecommendationFeedItem,
};
