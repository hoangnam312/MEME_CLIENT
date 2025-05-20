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
	LOGIN = '/login',
	REGISTER = '/register',
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
