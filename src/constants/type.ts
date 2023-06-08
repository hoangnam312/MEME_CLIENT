export interface IRestParameterAttribute {
	[key: string]: unknown;
}

export interface IImage {
	imagePath: string;
	tag: string;
	name?: string;
}
