import {
	faBars,
	faImages,
	faPhone,
	faUpload,
	faFileImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import ADropdown from 'src/component/atoms/ADropdown/ADropdown';
import { IOption } from 'src/component/atoms/ADropdown/ADropdown';
import { Path } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import useOpen from 'src/hooks/useOpen';

export interface MMobileNavDropdownPropsType {
	onUpload: () => void;
}

const MMobileNavDropdown = ({ onUpload }: MMobileNavDropdownPropsType) => {
	const { logout, isLoggedIn } = useAuthen();
	const navigate = useNavigate();

	const loggedInOptions: IOption[] = [
		{
			label: t('upload'),
			value: 'upload',
			icon: <FontAwesomeIcon icon={faUpload} className="mr-2 self-center" />,
		},
		{
			label: t('myMemes'),
			value: 'my-memes',
			icon: <FontAwesomeIcon icon={faFileImage} className="mr-2 self-center" />,
		},
		{
			label: t('bulkUpload.title'),
			value: 'bulk-upload',
			icon: <FontAwesomeIcon icon={faImages} className="mr-2 self-center" />,
		},
		{
			label: t('contactUs.title'),
			value: 'contact-us',
			icon: <FontAwesomeIcon icon={faPhone} className="mr-2 self-center" />,
		},
		{
			label: t('account.title'),
			value: 'account',
		},
		{
			label: t('logout'),
			value: 'logout',
		},
	];

	const guestOptions: IOption[] = [
		{
			label: t('upload'),
			value: 'upload',
			icon: <FontAwesomeIcon icon={faUpload} className="mr-2 self-center" />,
		},
		{
			label: t('contactUs.title'),
			value: 'contact-us',
			icon: <FontAwesomeIcon icon={faPhone} className="mr-2 self-center" />,
		},
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
			case 'upload':
				onUpload();
				break;
			case 'my-memes':
				navigate(Path.MY_MEME);
				break;
			case 'bulk-upload':
				navigate(Path.BULK_UPLOAD);
				break;
			case 'contact-us':
				navigate(Path.CONTACT_US);
				break;
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
		closeDropdown();
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
						className="flex h-14 w-14 cursor-pointer items-center justify-center p-4"
						onClick={isOpen ? closeDropdown : openDropdown}
						title={t('navigation.explore')}
					>
						<FontAwesomeIcon
							icon={faBars}
							size="xl"
							className="text-emerald-500"
						/>
					</div>
				}
				isOpen={isOpen}
				options={isLoggedIn() ? loggedInOptions : guestOptions}
				onSelect={onSelect}
			/>
		</div>
	);
};

export default MMobileNavDropdown;
