import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import ACopyButton from 'src/component/atoms/ACopyButton/ACopyButton';
import AInput from 'src/component/atoms/AInput/AInput';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import MInputWithinForm from 'src/component/molecules/MInputWithinForm/MInputWithinForm';
import { useAuthen } from 'src/hooks/useAuthen';
import {
	getMyProfile,
	MyProfileResponse,
	updateProfile,
	UpdateProfilePayload,
} from 'src/service/user';
import { useBoundStore } from 'src/store/store';
import {
	accountValidationSchema,
	ProfileFormData,
} from '../account.validation';
import { AxiosError } from 'axios';

const ProfileTab: React.FC = () => {
	const { profile } = useAuthen();
	const [avatarPreview, setAvatarPreview] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [userProfile, setUserProfile] = useState<MyProfileResponse | null>(
		null
	);
	const { updateAuthen } = useBoundStore((state) => state.authen);

	// Profile form
	const {
		register: registerProfile,
		handleSubmit: handleSubmitProfile,
		setValue,
		formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
	} = useForm<ProfileFormData>({
		resolver: yupResolver(accountValidationSchema.profile),
		defaultValues: {
			displayName: profile?.displayName || '',
			bio: profile?.bio || '',
		},
	});

	// Load user profile on component mount
	useEffect(() => {
		const loadUserProfile = async () => {
			try {
				setIsLoading(true);
				const response = await getMyProfile();
				const profileData = response.data;
				updateAuthen({
					...profileData,
					userId: profileData._id,
				});
				setUserProfile(profileData);

				setValue('displayName', profileData.profile?.displayName || '');
				// setValue('avatar', profileData.profile?.avatar || '');
				setValue('bio', profileData.profile?.bio || '');

				// Set avatar preview if exists
				if (profileData.profile?.avatar) {
					setAvatarPreview(profileData.profile.avatar);
				}
			} catch (error) {
				console.error('Failed to load profile:', error);
				toast.error(t('account.profile.loadError'));
			} finally {
				setIsLoading(false);
			}
		};

		loadUserProfile();
	}, [setValue, updateAuthen]);

	const onSubmitProfile: SubmitHandler<ProfileFormData> = async (data) => {
		try {
			let updatePayload: FormData | UpdateProfilePayload;

			// If there's an avatar file, use FormData for multipart upload
			if (avatarFile) {
				updatePayload = new FormData();
				updatePayload.append('displayName', data.displayName);
				updatePayload.append('bio', data.bio || '');
				updatePayload.append('avatar', avatarFile);
			} else {
				// Use regular JSON payload for text-only updates
				updatePayload = {
					displayName: data.displayName,
					bio: data.bio || '',
				};
			}

			const response = await updateProfile(updatePayload);

			const newAuthen = {
				profile: response.data.profile,
			};
			updateAuthen(newAuthen);

			// Update local state
			setUserProfile(response.data);

			// Clear avatar file after successful upload
			setAvatarFile(null);

			toast.success(t('account.profile.updateSuccess'));
		} catch (error) {
			console.error('Profile update error:', error);
			const errorMessage =
				error instanceof AxiosError && error.response?.data?.message
					? error.response.data.message
					: t('account.profile.updateError');
			toast.error(errorMessage);
		}
	};

	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error('File size too large. Please choose a file under 5MB.');
				return;
			}

			// Validate file type
			if (!file.type.startsWith('image/')) {
				toast.error('Please select a valid image file.');
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarPreview(e.target?.result as string);
			};
			reader.readAsDataURL(file);
			setAvatarFile(file);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	return (
		<div className="space-y-4 md:space-y-6">
			{/* Avatar Section */}
			<div className="flex flex-col items-center space-y-3 md:space-y-4">
				<div
					className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl md:h-20
                        md:w-20 md:rounded-2xl"
				>
					{avatarPreview ? (
						<img
							src={avatarPreview}
							alt="Avatar"
							className="rounded-xl object-cover md:rounded-2xl"
						/>
					) : (
						<FontAwesomeIcon icon={faUser} className="text-2xl md:text-3xl" />
					)}
					<label
						htmlFor="avatar-upload"
						className="absolute -bottom-2 -right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 md:-bottom-3 md:-right-3 md:h-8 md:w-8"
					>
						<FontAwesomeIcon icon={faCamera} className="text-xs md:text-sm" />
					</label>
					<input
						id="avatar-upload"
						type="file"
						accept="image/*"
						onChange={handleAvatarChange}
						className="hidden"
						disabled={isSubmittingProfile}
					/>
				</div>

				{avatarFile && (
					<div className="flex flex-col items-center space-y-1 md:space-y-2">
						<p className="text-xs text-gray-600 md:text-sm">
							Selected: {avatarFile.name}
						</p>
						<p className="text-[10px] text-gray-500 md:text-xs">
							Avatar will be uploaded when you save your profile
						</p>
					</div>
				)}

				<p className="text-xs text-gray-600 md:text-sm">
					{t('account.avatar.help')}
				</p>
			</div>

			{/* Profile Form */}
			<form
				onSubmit={handleSubmitProfile(onSubmitProfile)}
				className="space-y-4"
			>
				<div>
					<MInputWithinForm
						label={t('email')}
						rest={{
							value: userProfile?.email || '',
						}}
						readOnly={true}
						addClass="!pl-4"
						suffix={
							<div className="absolute bottom-3 right-2.5">
								<ACopyButton
									data={{
										value: userProfile?.email || '',
										strategy: 'text',
									}}
								/>
							</div>
						}
					/>
				</div>
				<div>
					<MInputWithinForm
						label={t('account.username')}
						rest={{
							value: userProfile?.username || '',
						}}
						readOnly={true}
						addClass="!pl-4"
						suffix={
							<div className="absolute bottom-3 right-2.5">
								<ACopyButton
									data={{
										value: userProfile?.username || '',
										strategy: 'text',
									}}
								/>
							</div>
						}
					/>
				</div>

				<div>
					<AInput
						label={t('account.displayName')}
						rest={{
							...registerProfile('displayName'),
						}}
						disabled={isSubmittingProfile || isLoading}
					/>
					{profileErrors.displayName?.message && (
						<p className="mt-1 text-sm text-red-500">
							{t(profileErrors.displayName.message)}
						</p>
					)}
				</div>

				<div>
					<label className="mb-1 block text-sm font-medium text-gray-700">
						{t('account.bio')}
					</label>
					<textarea
						{...registerProfile('bio')}
						disabled={isSubmittingProfile || isLoading}
						rows={4}
						className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100"
						placeholder={t('account.bio.placeholder')}
					/>
				</div>

				<div className="flex justify-end">
					<AButton
						rest={{
							type: 'submit',
							disabled: isSubmittingProfile || isLoading,
						}}
					>
						{isSubmittingProfile ? (
							<ALoading size="lg" />
						) : (
							t('account.saveChanges')
						)}
					</AButton>
				</div>
			</form>
		</div>
	);
};

export default ProfileTab;
