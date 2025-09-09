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
			addClassWrap="!w-1/2 xl:max-w-[75vh]"
		>
			<div className="relative max-h-screen overflow-auto">
				<h3 className="p-3 text-center text-xl font-bold text-main-color">
					{t('QuickUpload.dragHere')}
				</h3>

				<UploadImage closeModal={closeModal} />

				<div className="mt-3 flex justify-end">
					<AOutlineButton
						onClick={handleBulkUpload}
						addClass="text-sm flex items-center gap-2"
					>
						<FontAwesomeIcon icon={faImages} className="text-base" />
						{t('bulkUpload.button')}
					</AOutlineButton>
				</div>
			</div>
		</AModal>
	);
};

export default OUploadModal;
