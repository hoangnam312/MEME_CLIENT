import {
	faBars,
	faFire,
	faUsers,
	faImages,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import ADropdown from 'src/component/atoms/ADropdown/ADropdown';
import { Path } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import useOpen from 'src/hooks/useOpen';

const MNavDropdown = () => {
	const { isLoggedIn } = useAuthen();
	const navigate = useNavigate();

	// Options for logged in users
	const loggedInOptions = [
		{
			label: t('trending.title'),
			value: 'trending',
			icon: <FontAwesomeIcon icon={faFire} className="mr-2" />,
		},
		{
			label: t('trendingUsers.title'),
			value: 'trending-users',
			icon: <FontAwesomeIcon icon={faUsers} className="mr-2" />,
		},
		{
			label: t('bulkUpload.title'),
			value: 'bulk-upload',
			icon: <FontAwesomeIcon icon={faImages} className="mr-2" />,
		},
	];

	// Options for guests (not logged in)
	const guestOptions = [
		{
			label: t('trending.title'),
			value: 'trending',
			icon: <FontAwesomeIcon icon={faFire} className="mr-2" />,
		},
		{
			label: t('trendingUsers.title'),
			value: 'trending-users',
			icon: <FontAwesomeIcon icon={faUsers} className="mr-2" />,
		},
	];

	const onSelect = (value: string) => {
		switch (value) {
			case 'trending':
				navigate(Path.TRENDING);
				break;
			case 'trending-users':
				navigate(Path.TRENDING_USERS);
				break;
			case 'bulk-upload':
				navigate(Path.BULK_UPLOAD);
				break;
			default:
				break;
		}
		closeDropdown(); // Close dropdown after selection
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
                         p-4
                        `}
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

export default MNavDropdown;
