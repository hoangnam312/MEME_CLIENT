import { useState, useEffect } from 'react';
import {
	getPublicUserProfile,
	PublicUserProfileResponse,
} from 'src/service/user';

interface UseUserProfileReturn {
	user: PublicUserProfileResponse | null;
	isLoading: boolean;
	error: Error | null;
}

const useUserProfile = (userId: string): UseUserProfileReturn => {
	const [user, setUser] = useState<PublicUserProfileResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!userId) return;
		setIsLoading(true);
		setError(null);
		getPublicUserProfile(userId)
			.then((res) => setUser(res.data))
			.catch((err: Error) => setError(err))
			.finally(() => setIsLoading(false));
	}, [userId]);

	return { user, isLoading, error };
};

export default useUserProfile;
