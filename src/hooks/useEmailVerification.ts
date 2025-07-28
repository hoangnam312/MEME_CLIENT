import { useNavigate } from 'react-router';
import { useBoundStore } from 'src/store/store';
import { Path } from 'src/constants/type';

/**
 * Custom hook to handle email verification status and redirects
 */
export const useEmailVerification = () => {
	const navigate = useNavigate();
	const { emailVerification, email } = useBoundStore((state) => state.authen);

	/**
	 * Check if user needs to verify email and redirect if necessary
	 * @param redirectTo - Optional path to redirect after verification
	 * @returns true if verification is required, false if already verified
	 */
	const checkAndRedirectToVerification = (redirectTo?: string): boolean => {
		if (!emailVerification?.isVerified && email) {
			navigate(Path.VERIFY_EMAIL, {
				state: {
					email,
					redirectTo: redirectTo || Path.HOME_PAGE,
				},
			});
			return true;
		}
		return false;
	};

	/**
	 * Check if user is verified
	 * @returns true if email is verified, false otherwise
	 */
	const isEmailVerified = (): boolean => {
		return emailVerification?.isVerified || false;
	};

	/**
	 * Get verification status
	 * @returns verification status object
	 */
	const getVerificationStatus = () => {
		return {
			isVerified: emailVerification?.isVerified || false,
			verifiedAt: emailVerification?.verifiedAt,
			email,
		};
	};

	return {
		checkAndRedirectToVerification,
		isEmailVerified,
		getVerificationStatus,
		emailVerification,
		email,
	};
};
