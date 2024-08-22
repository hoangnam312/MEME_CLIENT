import api from './config';

interface InterfacePayloadLogin {
	email: string;
	password: string;
}

interface InterfacePayloadRegister {
	email: string;
	username: string;
	password: string;
}

const login = (payload: InterfacePayloadLogin) =>
	api.post('/auth/login', payload);

const register = (payload: InterfacePayloadRegister) =>
	api.post('/auth/register', payload);

export { login, register };
export type { InterfacePayloadLogin, InterfacePayloadRegister };
