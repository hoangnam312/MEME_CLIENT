import { t } from 'i18next';
import AInput, { AInputPropsType } from '../AInput/AInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ASearch = (props: AInputPropsType) => {
	return (
		<AInput
			{...props}
			labelButton={t('search')}
			icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
		/>
	);
};

export default ASearch;
