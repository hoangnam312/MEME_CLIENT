import { useNavigate } from 'react-router';
import { Path } from 'src/constants/type';

const useNavigateBack = () => {
	const navigate = useNavigate();

	const goBack = () => {
		if (window.history?.length && window.history.length > 1) {
			navigate(-1);
		} else {
			navigate(Path.HOME_PAGE);
		}
	};

	return goBack;
};

export default useNavigateBack;
