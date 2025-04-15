export interface IRestParameterAttribute {
	[key: string]: unknown;
}

export interface IImage {
	imagePath: string;
	tag: string;
	location: string;
	name?: string;
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
