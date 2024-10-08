import api from './config';

interface InterfacePayloadCreateMeme {
	name?: string;
	link?: string;
	description?: string;
	image?: string;
	tag?: string;
}

const createMeme = (payload: FormData) =>
	api.post('/meme', payload, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export { createMeme };
export type { InterfacePayloadCreateMeme };
