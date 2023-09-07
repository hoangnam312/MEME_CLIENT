import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useRef } from 'react';
import AModal from 'src/component/atoms/AModal/AModal';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import { color } from 'src/config/style';

export interface OQuickUploadPropsType {
	isOpen: boolean;
	closeModal: () => void;
	onSelectImage: () => void;
}

const OQuickUpload = ({
	isOpen,
	closeModal,
	onSelectImage,
}: OQuickUploadPropsType) => {
	const inputFile = useRef();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onPreHandleImage = (e: unknown) => {
		// !TODO: handle data to image
		onSelectImage();
	};

	return (
		<AModal isOpen={isOpen} closeModal={closeModal}>
			<div className="relative">
				<h3 className="p-3 text-center text-xl font-bold text-main-color">
					{t('QuickUpload.dragHere')}
				</h3>
				<div
					className="my-10 flex items-center justify-center rounded-lg border-2 border-dashed border-main-color bg-gray-100 pb-8 pt-14 text-5xl"
					onClick={() => inputFile?.current.click()}
				>
					<FontAwesomeIcon
						icon={faUpload}
						bounce
						size="2xl"
						style={{ color: color.main }}
					/>
				</div>
				<ASearch
					placeholder={t('QuickUpload.pastHere')}
					onChange={(e) => onPreHandleImage(e)}
				/>
			</div>
			<input
				ref={inputFile}
				type="file"
				className="hidden"
				onChange={(e) => onPreHandleImage(e)}
			/>
		</AModal>
	);
};

export default OQuickUpload;
