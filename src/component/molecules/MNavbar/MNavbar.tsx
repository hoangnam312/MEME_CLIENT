import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AButton from 'src/component/atoms/AButton/AButton';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import OUploadModal from 'src/component/organisms/OUploadModal/OUploadModal';
import { Path, typeModal } from 'src/constants/type';
import useOpen from 'src/hooks/useOpen';
import MUserDropdown from '../MUserDropdown/MUserDropdown';
import MNavDropdown from '../MNavDropdown/MNavDropdown';
import MMobileNavDropdown from './MMobileNavDropdown';
import { t } from 'i18next';
import { useAuthen } from 'src/hooks/useAuthen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
			<div className="fixed top-0 z-10 w-full bg-white px-4 py-2 shadow-lg shadow-emerald-200 backdrop-blur-sm sm:px-6 dark:bg-gray-800">
				{/* Mobile & Tablet Layout (< 1024px) */}
				<div className="flex flex-col gap-2 lg:hidden">
					{/* Top row: Logo, Search, Hamburger */}
					<div className="flex items-center justify-between gap-4">
						<div className="flex flex-shrink-0 items-center justify-start">
							<img
								className="h-12 w-12 cursor-pointer object-cover sm:h-14 sm:w-14"
								src="logo.svg"
								alt="logo"
								onClick={() => (window.location.href = '/')}
							/>
						</div>
						<div className="flex-1">
							<ASearch
								onSubmit={(_, value) => onSearch(value)}
								placeholder={t('mobileSearchPlaceholder')}
								addClassWrapper="w-full"
							/>
						</div>
						<div className="flex flex-shrink-0 items-center justify-end">
							<MMobileNavDropdown onUpload={openModal} />
						</div>
					</div>
				</div>

				{/* Desktop Layout (>= 1024px) */}
				<div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
					{/* Left section */}
					<div className="flex flex-shrink-0 items-center justify-start">
						<div className="mr-5 flex items-center justify-start">
							<img
								className="h-14 w-14 cursor-pointer object-cover"
								src="logo.svg"
								alt="logo"
								onClick={() => (window.location.href = '/')}
							/>
						</div>
						<div className="flex items-center justify-center">
							<AButton content={t('upload')} onClick={openModal} />
						</div>
					</div>

					{/* Center section */}
					<div className="flex-1 justify-center">
						<div className="w-full">
							<ASearch
								onSubmit={(_, value) => onSearch(value)}
								placeholder={t('searchPlaceholder')}
								addClassWrapper="mx-5"
							/>
						</div>
					</div>

					{/* Right section */}
					<div className="justify-en flex flex-shrink-0 items-center">
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
			</div>
			<div className="h-20" />

			{/* Floating Upload Button for Mobile & Tablet */}
			<div className="fixed bottom-6 left-0 right-0 z-20 flex items-center justify-center lg:hidden">
				<AButton onClick={openModal}>
					<FontAwesomeIcon size="2x" icon={faPlus} />
				</AButton>
			</div>

			<OUploadModal isOpen={isOpen} closeModal={closeModal} />
		</>
	);
};
