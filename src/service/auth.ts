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

interface InterfacePayloadForgotPassword {
	email: string;
}

interface InterfacePayloadVerifyResetCode {
	email: string;
	code: string;
}

interface InterfacePayloadResetPassword {
	email: string;
	code: string;
	newPassword: string;
}

const login = (payload: InterfacePayloadLogin) =>
	api.post('/auth/login', payload);

const register = (payload: InterfacePayloadRegister) =>
	api.post('/auth/register', payload);

const forgotPassword = (payload: InterfacePayloadForgotPassword) =>
	api.post('/auth/forgot-password', payload);

const verifyResetCode = (payload: InterfacePayloadVerifyResetCode) =>
	api.post('/auth/verify-reset-code', payload);

const resetPassword = (payload: InterfacePayloadResetPassword) =>
	api.post('/auth/reset-password', payload);

export { login, register, forgotPassword, verifyResetCode, resetPassword };

export type {
	InterfacePayloadLogin,
	InterfacePayloadRegister,
	InterfacePayloadForgotPassword,
	InterfacePayloadVerifyResetCode,
	InterfacePayloadResetPassword,
};
