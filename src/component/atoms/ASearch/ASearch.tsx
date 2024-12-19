import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MInputWithinForm, {
	MInputWithinFormPropsType,
} from 'src/component/molecules/MInputWithinForm/MInputWithinForm';

const ASearch = (props: MInputWithinFormPropsType) => {
	return (
		<MInputWithinForm
			labelButton={t('search')}
			icon={
				<FontAwesomeIcon className="text-violet-900" icon={faMagnifyingGlass} />
			}
			{...props}
		/>
	);
};

export default ASearch;
