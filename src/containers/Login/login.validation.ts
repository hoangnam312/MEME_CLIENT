import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required('validate.requiredField')
		.email('validate.invalidEmail')
		.min(5, 'validate.emailMinLength')
		.max(254, 'validate.emailMaxLength'),
	password: yup
		.string()
		.required('validate.requiredField')
		.min(6, 'validate.passwordMinLength')
		.max(128, 'validate.passwordMaxLength'),
});

export type LoginFormData = yup.InferType<typeof loginValidationSchema>;
