import { useNavigate } from 'react-router';
import { Path } from 'src/constants/type';
import { TBoundStore, useBoundStore } from 'src/store/store';
import { clearToken } from 'src/utils/token';

export const useAuthen = () => {
	const { email, username, userId, token, bio, updateAuthen } = useBoundStore(
		(state: TBoundStore) => state.authen
	);
	const navigate = useNavigate();

	const logout = () => {
		updateAuthen({
			email: '',
			username: '',
			password: '',
			userId: '',
			token: '',
			bio: '',
		});
		clearToken();
		localStorage.removeItem('authen');
		navigate(Path.LOGIN);
	};

	const isLoggedIn = (): boolean => !!token;

	return { email, username, userId, token, bio, logout, isLoggedIn };
};
