import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required('validate.requiredField')
		.email('validate.invalidEmail')
		.min(5, 'validate.emailMinLength')
		.max(254, 'validate.emailMaxLength'),
	username: yup
		.string()
		.required('validate.requiredField')
		.min(3, 'validate.usernameMinLength')
		.max(50, 'validate.usernameMaxLength'),
	password: yup
		.string()
		.required('validate.requiredField')
		.min(6, 'validate.passwordMinLength')
		.max(128, 'validate.passwordMaxLength'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'validate.passwordsMustMatch')
		.required('validate.requiredField'),
});

export type RegisterFormData = yup.InferType<typeof registerValidationSchema>;
