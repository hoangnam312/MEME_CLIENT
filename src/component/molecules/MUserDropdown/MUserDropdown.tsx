import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ADropdown from 'src/component/atoms/ADropdown/ADropdown';
import { defaultStye } from 'src/assets/css/defaultStyle';
import useOpen from 'src/hooks/useOpen';
import { t } from 'i18next';
import { useAuthen } from 'src/hooks/useAuthen';
import { useNavigate } from 'react-router';
import { Path } from 'src/constants/type';

const MUserDropdown = () => {
	const { logout, isLoggedIn } = useAuthen();
	const navigate = useNavigate();
	const options = [
		{
			label: t('logout'),
			value: 'logout',
		},
	];

	const optionsNoLoggedIn = [
		{
			label: t('login'),
			value: 'login',
		},
		{
			label: t('register'),
			value: 'register',
		},
	];

	const onSelect = (value: string) => {
		switch (value) {
			case 'logout':
				logout();
				break;
			case 'login':
				navigate(Path.LOGIN);
				break;
			case 'register':
				navigate(Path.REGISTER);
				break;
			default:
				break;
		}
	};

	const {
		isOpen,
		openModal: openDropdown,
		closeModal: closeDropdown,
	} = useOpen();
	return (
		<div className="flex items-center justify-start">
			<ADropdown
				buttonOutside={
					<div
						className={`flex h-14 w-14 cursor-pointer items-center justify-center 
                        rounded-full border-2 border-main-background p-4 ${defaultStye.border}`}
						onClick={isOpen ? closeDropdown : openDropdown}
					>
						<FontAwesomeIcon icon={faUser} size="xl" />
					</div>
				}
				isOpen={isOpen}
				options={isLoggedIn() ? options : optionsNoLoggedIn}
				onSelect={onSelect}
			/>
		</div>
	);
};

export default MUserDropdown;
