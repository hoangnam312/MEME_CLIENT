import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AButton from 'src/component/atoms/AButton/AButton';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import OUploadModal from 'src/component/organisms/OUploadModal/OUploadModal';
import { Path, typeModal } from 'src/constants/type';
import useOpen from 'src/hooks/useOpen';
import MUserDropdown from '../MUserDropdown/MUserDropdown';
import MNavDropdown from '../MNavDropdown/MNavDropdown';
import { t } from 'i18next';
import { useAuthen } from 'src/hooks/useAuthen';

export interface MNavbarPropsType {
	updateModalOpening: (type: typeModal) => void;
}

export const MNavbar = ({ updateModalOpening }: MNavbarPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const { isLoggedIn } = useAuthen();
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
			<div className="relative z-10 flex flex-row items-center justify-between bg-white px-6 py-2 shadow-lg shadow-emerald-200 backdrop-blur-sm dark:bg-gray-800">
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
					{isLoggedIn() && (
						<div className="mr-5 flex items-center justify-end">
							<AButton
								content={t('myMemes')}
								onClick={() => navigate(Path.MY_MEME)}
							/>
						</div>
					)}
					<div className="mr-5">
						<MNavDropdown />
					</div>
					<div className="flex items-center justify-start">
						<MUserDropdown />
					</div>
				</div>
			</div>
			<OUploadModal isOpen={isOpen} closeModal={closeModal} />
		</>
	);
};
