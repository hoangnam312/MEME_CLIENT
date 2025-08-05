import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import ADropdown from 'src/component/atoms/ADropdown/ADropdown';
import { Path } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import useOpen from 'src/hooks/useOpen';
import { defaultStye } from 'src/assets/css/defaultStyle';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MUserDropdown = () => {
	const { logout, isLoggedIn, profile } = useAuthen();
	const navigate = useNavigate();
	const options = [
		{
			label: t('account.title'),
			value: 'account',
		},
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
			case 'account':
				navigate(Path.ACCOUNT);
				break;
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
					isLoggedIn() && profile?.avatar ? (
						<div
							className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl `}
							onClick={isOpen ? closeDropdown : openDropdown}
						>
							<img
								src={profile?.avatar || ''}
								alt={profile?.avatar || 'avatar'}
								className="rounded-2xl object-cover"
							/>
						</div>
					) : (
						<div
							className={`flex h-14 w-14 cursor-pointer items-center justify-center 
					rounded-2xl border-2 border-main-background p-4 ${defaultStye.border}`}
							onClick={isOpen ? closeDropdown : openDropdown}
						>
							<FontAwesomeIcon icon={faUser} size="xl" />
						</div>
					)
				}
				isOpen={isOpen}
				options={isLoggedIn() ? options : optionsNoLoggedIn}
				onSelect={onSelect}
			/>
		</div>
	);
};

export default MUserDropdown;
