import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MInputWithinForm, {
	MInputWithinFormPropsType,
} from 'src/component/molecules/MInputWithinForm/MInputWithinForm';

const ASearch = (props: MInputWithinFormPropsType) => {
	return (
		<>
			{/* Mobile & Tablet Version (< 1024px) */}
			<div className="lg:hidden">
				<MInputWithinForm
					labelButton={<FontAwesomeIcon size="xl" icon={faMagnifyingGlass} />}
					{...props}
				/>
			</div>

			{/* Desktop Version (>= 1024px) */}
			<div className="hidden lg:block">
				<MInputWithinForm
					labelButton={t('search')}
					icon={
						<FontAwesomeIcon
							className="text-violet-900 dark:text-white"
							icon={faMagnifyingGlass}
						/>
					}
					{...props}
				/>
			</div>
		</>
	);
};

export default ASearch;
