import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { defaultStye } from 'src/assets/css/defaultStyle';
import AButton from 'src/component/atoms/AButton/AButton';
import ASearch from 'src/component/atoms/ASearch/ASearch';

export const MNavbar = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-row items-center justify-between bg-white px-6 py-2 dark:bg-gray-800">
			<div className="flex items-center justify-start">
				<div className="mr-5 flex items-center justify-start">
					<img
						className="h-10 w-10 rounded-full object-cover"
						src="vite.svg"
						alt="viteIcon"
					/>
				</div>
				<div className="flex items-center justify-center">
					<AButton content={t('upload')} />
				</div>
			</div>
			<div className="flex basis-1/2 items-center justify-end">
				<ASearch addClassWrapper="w-full" />
			</div>
			<div className="flex items-center justify-end">
				<div className="mr-5 flex items-center justify-end">
					<AButton content={t('myMemes')} />
				</div>
				<div className="flex items-center justify-start">
					<div
						className={`flex h-14 w-14 cursor-pointer items-center justify-center 
						rounded-full border-2 border-main-background p-4 ${defaultStye.border}`}
					>
						<FontAwesomeIcon icon={faUser} size="xl" />
					</div>
				</div>
			</div>
		</div>
	);
};
