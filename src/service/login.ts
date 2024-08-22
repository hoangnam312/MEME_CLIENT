import api from './config';

interface InterfacePayloadLogin {
	email: string;
	password: string;
}

const login = (payload: InterfacePayloadLogin) =>
	api.post('/auth/login', payload);

export { login };
export type { InterfacePayloadLogin };
