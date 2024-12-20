import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { defaultStye } from 'src/assets/css/defaultStyle';
import AButton from 'src/component/atoms/AButton/AButton';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import OUploadModal from 'src/component/organisms/OUploadModal/OUploadModal';
import { typeModal } from 'src/constants/type';
import useOpen from 'src/hooks/useOpen';

export interface MNavbarPropsType {
	updateModalOpening: (type: typeModal) => void;
}

export const MNavbar = ({ updateModalOpening }: MNavbarPropsType) => {
	const { t } = useTranslation();
	const { isOpen, openModal, closeModal } = useOpen();
	const navigate = useNavigate();

	useEffect(() => {
		if (isOpen) updateModalOpening(typeModal.UPLOAD);
		else updateModalOpening(typeModal.NONE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const onSearch = (value: string) => {
		navigate(`?search=${value}`);
	};

	return (
		<>
			<div className="flex flex-row items-center justify-between bg-white px-6 py-2 shadow-lg shadow-emerald-200 backdrop-blur-sm dark:bg-gray-800">
				<div className="flex items-center justify-start">
					<div className="mr-5 flex items-center justify-start">
						<img
							className="h-10 w-10 cursor-pointer rounded-full object-cover"
							src="vite.svg"
							alt="viteIcon"
							onClick={() => (window.location.href = '/')}
						/>
					</div>
					<div className="flex items-center justify-center">
						<AButton content={t('upload')} onClick={openModal} />
					</div>
				</div>
				<div className="flex basis-1/2 items-center justify-end">
					<ASearch
						onSubmit={(_, value) => onSearch(value)}
						addClassWrapper="w-full"
					/>
				</div>
				<div className="flex items-center justify-end">
					<div className="mr-5 flex items-center justify-end">
						<AButton
							content={t('myMemes')}
							onClick={() => (window.location.href = '/my-meme')}
						/>
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
			<OUploadModal
				isOpen={isOpen}
				closeModal={closeModal}
				onSelectImage={() => {
					console.log('onSelect');
				}}
			/>
		</>
	);
};
