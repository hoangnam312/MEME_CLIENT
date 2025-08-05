import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
	EmailVerificationStatus,
	UserPreferences,
	UserProfile,
	UserStats,
	UserTimestamps,
} from 'src/constants/auth.type';
import { Path } from 'src/constants/type';
import { googleOAuth } from 'src/service/auth';
import { useBoundStore } from 'src/store/store';
import { getErrorFromAxiosError } from 'src/utils/error';
import { initializeLanguage } from 'src/utils/languageUtils';
import { setToken } from 'src/utils/token';

// Types for better type safety
interface GoogleOAuthResponse {
	data: {
		_id: string;
		username: string;
		email: string;
		profile?: UserProfile;
		stats: UserStats;
		preferences: UserPreferences;
		timestamps: UserTimestamps;
		emailVerification: EmailVerificationStatus;
		authentication: {
			token: string;
		};
		isNewUser: boolean;
		oauthProvider: 'google';
	};
}

interface AuthenticationData {
	_id: string;
	userId: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
	emailVerification: EmailVerificationStatus;
	token: string;
	isNewUser: boolean;
	oauthProvider: 'google';
}

interface UseLoginWithGoogleReturn {
	loginWithGoogle: () => void;
	isLoading: boolean;
}

// Process Google OAuth API response
const processGoogleOAuthResponse = (
	response: GoogleOAuthResponse
): AuthenticationData => {
	const newAuthenticationData: AuthenticationData = {
		...response.data,
		userId: response.data._id,
		token: response.data.authentication.token,
	};
	return newAuthenticationData;
};

// Store authentication data in localStorage and state
const storeAuthenticationData = (
	authenticationData: AuthenticationData,
	updateAuthentication: (data: Partial<AuthenticationData>) => void
): void => {
	setToken(authenticationData.token);
	localStorage.setItem('authen', JSON.stringify(authenticationData));
	updateAuthentication(authenticationData);
};

// Handle successful Google OAuth authentication
const handleGoogleOAuthSuccess = async (
	tokenResponse: Omit<
		TokenResponse,
		'error' | 'error_description' | 'error_uri'
	>,
	updateAuthentication: (data: Partial<AuthenticationData>) => void,
	navigate: (path: string) => void,
	setIsLoading: (loading: boolean) => void
): Promise<void> => {
	try {
		setIsLoading(true);

		const response = await googleOAuth({
			access_token: tokenResponse.access_token,
		});

		// Process the response
		const authenticationData = processGoogleOAuthResponse(response);

		// Store authentication data
		storeAuthenticationData(authenticationData, updateAuthentication);

		// Initialize language based on user preferences
		await initializeLanguage(response.data.preferences);

		// Navigate to homepage
		navigate(Path.HOME_PAGE);
	} catch (error: unknown) {
		const errorMessage = getErrorFromAxiosError(error);
		toast.error(errorMessage);
	} finally {
		setIsLoading(false);
	}
};

// Handle Google OAuth errors
const handleGoogleOAuthError = (error: unknown): void => {
	const errorMessage = getErrorFromAxiosError(error);
	toast.error(errorMessage);
};

const useLoginWithGoogle = (): UseLoginWithGoogleReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const updateAuthentication = useBoundStore(
		(state) => state.authen.updateAuthen
	);

	const login = useGoogleLogin({
		onSuccess: (
			tokenResponse: Omit<
				TokenResponse,
				'error' | 'error_description' | 'error_uri'
			>
		) =>
			handleGoogleOAuthSuccess(
				tokenResponse,
				updateAuthentication,
				navigate,
				setIsLoading
			),
		onError: (error) => handleGoogleOAuthError(error),
	});

	return {
		loginWithGoogle: login,
		isLoading,
	};
};

export default useLoginWithGoogle;
