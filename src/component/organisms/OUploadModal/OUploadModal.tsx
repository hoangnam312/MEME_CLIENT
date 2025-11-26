import { faImages } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import { useNavigate } from 'react-router';

import AModal from 'src/component/atoms/AModal/AModal';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Path } from 'src/constants/type';
import UploadImage from './UploadImage';

export interface OUploadModalPropsType {
	isOpen: boolean;
	closeModal: () => void;
}

const OUploadModal = ({ isOpen, closeModal }: OUploadModalPropsType) => {
	const navigate = useNavigate();

	const handleBulkUpload = () => {
		closeModal();
		navigate(Path.BULK_UPLOAD);
	};

	return (
		<AModal
			isOpen={isOpen}
			closeModal={closeModal}
			addClassWrap="!w-full md:!w-3/4 lg:!w-2/3 xl:!w-1/2 xl:max-w-[75vh]"
		>
			<div className="relative max-h-screen overflow-auto">
				<h3 className="p-2 text-center text-lg font-bold text-main-color md:p-3 md:text-xl">
					{t('QuickUpload.dragHere')}
				</h3>

				<UploadImage closeModal={closeModal} />

				<div className="mt-2 flex justify-center px-2 md:mt-3 md:justify-end md:px-0">
					<AOutlineButton
						onClick={handleBulkUpload}
						addClass="text-xs md:text-sm flex items-center gap-1 md:gap-2 w-full md:w-auto justify-center"
					>
						<FontAwesomeIcon icon={faImages} className="text-sm md:text-base" />
						{t('bulkUpload.button')}
					</AOutlineButton>
				</div>
			</div>
		</AModal>
	);
};

export default OUploadModal;
