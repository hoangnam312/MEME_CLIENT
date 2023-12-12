export interface IRestParameterAttribute {
	[key: string]: unknown;
}

export interface IImage {
	imagePath: string;
	tag: string;
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
