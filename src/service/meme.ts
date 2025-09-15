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

// New types for recommendation API
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
};
