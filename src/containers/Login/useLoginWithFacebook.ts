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
import { facebookOAuth } from 'src/service/auth';
import { useBoundStore } from 'src/store/store';
import { getErrorFromAxiosError } from 'src/utils/error';
import { initializeLanguage } from 'src/utils/languageUtils';
import { setToken } from 'src/utils/token';
import { SuccessResponse as FacebookSuccessResponse } from '@greatsumini/react-facebook-login';

// Types for better type safety
interface FacebookOAuthResponse {
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
		oauthProvider: 'facebook';
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
	oauthProvider: 'facebook';
}

interface UseLoginWithFacebookReturn {
	isLoading: boolean;
	onSuccess: (response: FacebookSuccessResponse) => void;
	onError: (error: unknown) => void;
}

// Process Facebook OAuth API response
const processFacebookOAuthResponse = (
	response: FacebookOAuthResponse
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

// Handle successful Facebook OAuth authentication
const handleFacebookOAuthSuccess = async (
	accessToken: string,
	updateAuthentication: (data: Partial<AuthenticationData>) => void,
	navigate: (path: string) => void,
	setIsLoading: (loading: boolean) => void
): Promise<void> => {
	try {
		setIsLoading(true);

		const response = await facebookOAuth({
			access_token: accessToken,
		});

		// Process the response
		const authenticationData = processFacebookOAuthResponse(response);

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

// Handle Facebook OAuth errors
const handleFacebookOAuthError = (error: unknown): void => {
	const errorMessage = getErrorFromAxiosError(error);
	toast.error(errorMessage);
};

// work with localhost https://localhost:5173 not http
const useLoginWithFacebook = (): UseLoginWithFacebookReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const updateAuthentication = useBoundStore(
		(state) => state.authen.updateAuthen
	);

	const onSuccess = (response: FacebookSuccessResponse) => {
		handleFacebookOAuthSuccess(
			response.accessToken,
			updateAuthentication,
			navigate,
			setIsLoading
		);
	};

	const onError = (error: unknown) => {
		handleFacebookOAuthError(error);
	};

	return {
		isLoading,
		onSuccess,
		onError,
	};
};

export default useLoginWithFacebook;
