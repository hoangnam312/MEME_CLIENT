import { useNavigate } from 'react-router';
import { Path } from 'src/constants/type';
import { TBoundStore, useBoundStore } from 'src/store/store';
import { clearToken } from 'src/utils/token';

export const useAuthen = () => {
	const {
		email,
		username,
		userId,
		token,
		preferences,
		profile,
		stats,
		updateAuthen,
	} = useBoundStore((state: TBoundStore) => state.authen);
	const navigate = useNavigate();

	const logout = () => {
		updateAuthen({
			email: '',
			username: '',
			userId: '',
			token: '',
			profile: undefined,
			stats: {
				followersCount: 0,
				followingCount: 0,
				memesCount: 0,
			},
			preferences: {
				contentLanguage: preferences.contentLanguage,
			},
			timestamps: {
				createdAt: '',
				updatedAt: '',
			},
		});
		clearToken();
		localStorage.removeItem('authen');
		navigate(Path.LOGIN);
	};

	const isLoggedIn = (): boolean => !!token;

	return {
		email,
		username,
		userId,
		token,
		preferences,
		profile,
		stats,
		logout,
		isLoggedIn,
	};
};
