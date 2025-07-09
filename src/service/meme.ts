import {
	IImage,
	TypeParams,
	InterfaceId,
	IParamsGetListCursor,
	IResponseGetListCursor,
	ITrendingParams,
	ITrendingResponse,
} from 'src/constants/type';
import api from './config';

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
	data: IImage[];
}

interface IBodyTrackingMeme {
	memeId: string;
	action: 'like' | 'copy' | 'view' | 'dislike' | 'add-to-album';
}

interface IParamsGetRecommendMemesByImage extends IParamsGetListCursor {
	imageId: string;
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

const getRecommendMemes = (params?: IParamsGetListCursor) =>
	api.get<IResponseGetListCursor<IImage>>('/meme/recommend', { params });

const getRecommendMemesByImage = (params?: IParamsGetRecommendMemesByImage) =>
	api.get<IResponseGetListCursor<IImage>>('/meme/recommend/by-image', {
		params,
	});

const trackingMeme = (body?: IBodyTrackingMeme) =>
	api.post(`/user-action`, body);

const getTrendingMemes = (params?: ITrendingParams) =>
	api.get<ITrendingResponse>('/meme/trending', { params });

export {
	createMeme,
	getMemes,
	deleteMeme,
	getRecommendMemes,
	trackingMeme,
	getRecommendMemesByImage,
	getTrendingMemes,
};
export type {
	InterfacePayloadCreateMeme,
	InterfaceParamsGetMemes,
	InterfaceResponseGetMemes,
	IBodyTrackingMeme,
	IParamsGetRecommendMemesByImage,
};
