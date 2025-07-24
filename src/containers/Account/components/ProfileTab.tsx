import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import { useAuthen } from 'src/hooks/useAuthen';
import {
	accountValidationSchema,
	ProfileFormData,
} from '../account.validation';

const ProfileTab: React.FC = () => {
	const { email, username } = useAuthen();
	const [avatarPreview, setAvatarPreview] = useState<string>('');

	// Profile form
	const {
		register: registerProfile,
		handleSubmit: handleSubmitProfile,
		formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
	} = useForm<ProfileFormData>({
		resolver: yupResolver(accountValidationSchema.profile),
		defaultValues: {
			username: username || '',
			email: email || '',
			bio: '',
		},
	});

	const onSubmitProfile: SubmitHandler<ProfileFormData> = async (data) => {
		try {
			// TODO: Replace with actual API call
			console.log('Profile update:', data);

			// Update local state
			// updateAuthen({
			// 	email: data.email,
			// 	username: data.username,
			// 	userId,
			// 	token: '',
			// 	preferences: {
			// 		contentLanguage: preferences.contentLanguage,
			// 	},
			// 	timestamps: {
			// 		createdAt: '',
			// 		updatedAt: '',
			// 	},
			// });

			toast.success(t('account.profile.updateSuccess'));
		} catch (error) {
			toast.error(t('account.profile.updateError'));
		}
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
			// TODO: Upload avatar to server
		}
	};

	return (
		<div className="space-y-6">
			{/* Avatar Section */}
			<div className="flex flex-col items-center space-y-4">
				<div
					className="relative flex h-20 w-20 cursor-pointer items-center justify-center 
                        rounded-2xl border-2 border-main-background"
				>
					{avatarPreview ? (
						<img src={avatarPreview} alt="Avatar" className="object-cover" />
					) : (
						<FontAwesomeIcon icon={faUser} size="xl" />
					)}
					<label
						htmlFor="avatar-upload"
						className="absolute -bottom-3 -right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
					>
						<FontAwesomeIcon icon={faCamera} size="sm" />
					</label>
					<input
						id="avatar-upload"
						type="file"
						accept="image/*"
						onChange={handleAvatarChange}
						className="hidden"
					/>
				</div>
				<p className="text-sm text-gray-600">{t('account.avatar.help')}</p>
			</div>

			{/* Profile Form */}
			<form
				onSubmit={handleSubmitProfile(onSubmitProfile)}
				className="space-y-4"
			>
				<div>
					<AInput
						label={t('account.username')}
						rest={{
							...registerProfile('username'),
							disabled: isSubmittingProfile,
						}}
					/>
					{profileErrors.username?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(profileErrors.username.message)}
						</p>
					)}
				</div>

				<div>
					<AInput
						type="email"
						label={t('email')}
						rest={{
							...registerProfile('email'),
							disabled: isSubmittingProfile,
						}}
					/>
					{profileErrors.email?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(profileErrors.email.message)}
						</p>
					)}
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700">
						{t('account.bio')}
					</label>
					<textarea
						{...registerProfile('bio')}
						disabled={isSubmittingProfile}
						rows={4}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
						placeholder={t('account.bio.placeholder')}
					/>
				</div>

				<div className="flex justify-end">
					<AButton
						content={t('account.saveChanges')}
						rest={{
							type: 'submit',
							disabled: isSubmittingProfile,
						}}
					/>
				</div>
			</form>
		</div>
	);
};

export default ProfileTab;
