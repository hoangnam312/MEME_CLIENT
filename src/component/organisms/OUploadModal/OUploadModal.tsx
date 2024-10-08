import { t } from 'i18next';

import AModal from 'src/component/atoms/AModal/AModal';

import UploadImage from './UploadImage';

export interface OUploadModalPropsType {
	isOpen: boolean;
	closeModal: () => void;
	onSelectImage: () => void;
}

const OUploadModal = ({ isOpen, closeModal }: OUploadModalPropsType) => {
	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-1/2">
			<div className="relative max-h-screen overflow-auto">
				<h3 className="p-3 text-center text-xl font-bold text-main-color">
					{t('QuickUpload.dragHere')}
				</h3>

				<UploadImage closeModal={closeModal} />
			</div>
		</AModal>
	);
};

export default OUploadModal;
