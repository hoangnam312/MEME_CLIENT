import * as yup from 'yup';

// Profile form validation
export const profileValidationSchema = yup.object({
	username: yup
		.string()
		.required('validate.requiredField')
		.min(3, 'validate.usernameMinLength')
		.max(50, 'validate.usernameMaxLength'),
	email: yup
		.string()
		.required('validate.requiredField')
		.email('validate.invalidEmail')
		.min(5, 'validate.emailMinLength')
		.max(254, 'validate.emailMaxLength'),
	bio: yup.string().max(500, 'validate.bioMaxLength').default('').optional(),
});

// Password form validation
export const passwordValidationSchema = yup.object().shape({
	currentPassword: yup
		.string()
		.required('validate.requiredField')
		.min(6, 'validate.passwordMinLength')
		.max(128, 'validate.passwordMaxLength'),
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

// Combined validation schemas
export const accountValidationSchema = {
	profile: profileValidationSchema,
	password: passwordValidationSchema,
};

// Type definitions
export type ProfileFormData = yup.InferType<typeof profileValidationSchema>;
export type PasswordFormData = yup.InferType<typeof passwordValidationSchema>;
export type AccountFormData = ProfileFormData | PasswordFormData;
