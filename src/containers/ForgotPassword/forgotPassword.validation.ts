import * as yup from 'yup';

export const emailValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required('validate.requiredField')
		.email('validate.invalidEmail')
		.min(5, 'validate.emailMinLength')
		.max(254, 'validate.emailMaxLength'),
});

export const codeValidationSchema = yup.object().shape({
	code: yup
		.string()
		.required('validate.requiredField')
		.matches(/^\d{6}$/, 'Code must be 6 digits'),
});

export const resetPasswordValidationSchema = yup.object().shape({
	newPassword: yup
		.string()
		.required('validate.requiredField')
		.min(6, 'validate.passwordMinLength')
		.max(128, 'validate.passwordMaxLength'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'validate.passwordsMustMatch')
		.required('validate.requiredField'),
});

export type EmailFormData = {
	email: string;
};

export type CodeFormData = {
	code: string;
};

export type ResetPasswordFormData = {
	newPassword: string;
	confirmPassword: string;
};
