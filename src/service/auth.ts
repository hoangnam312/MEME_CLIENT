import { LoginResponse, RegisterResponse } from 'src/constants/auth.type';
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

interface InterfacePayloadSendVerificationCode {
	email?: string;
}

interface InterfacePayloadVerifyEmail {
	code: string;
	email?: string;
}

const login = (payload: InterfacePayloadLogin) =>
	api.post<LoginResponse>('/auth/login', payload);

const register = (payload: InterfacePayloadRegister) =>
	api.post<RegisterResponse>('/auth/register', payload);

const forgotPassword = (payload: InterfacePayloadForgotPassword) =>
	api.post('/auth/forgot-password', payload);

const verifyResetCode = (payload: InterfacePayloadVerifyResetCode) =>
	api.post('/auth/verify-reset-code', payload);

const resetPassword = (payload: InterfacePayloadResetPassword) =>
	api.post('/auth/reset-password', payload);

const sendVerificationCode = (payload: InterfacePayloadSendVerificationCode) =>
	api.post('/auth/send-verification-code', payload);

const verifyEmail = (payload: InterfacePayloadVerifyEmail) =>
	api.post('/auth/verify-email', payload);

export {
	login,
	register,
	forgotPassword,
	verifyResetCode,
	resetPassword,
	sendVerificationCode,
	verifyEmail,
};

export type {
	InterfacePayloadLogin,
	InterfacePayloadRegister,
	InterfacePayloadForgotPassword,
	InterfacePayloadVerifyResetCode,
	InterfacePayloadResetPassword,
	InterfacePayloadSendVerificationCode,
	InterfacePayloadVerifyEmail,
};
