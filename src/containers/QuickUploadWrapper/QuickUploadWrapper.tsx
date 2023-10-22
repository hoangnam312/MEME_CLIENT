import { ReactNode } from 'react';
import OQuickUpload from 'src/component/organisms/OQuickUpload/OQuickUpload';
import useOpen from 'src/hooks/useOpen';

export interface QuickUploadWrapperPropsType {
	children: ReactNode;
}

const QuickUploadWrapper = ({ children }: QuickUploadWrapperPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();

	return (
		<>
			<div onDragEnter={openModal}>{children}</div>
			<OQuickUpload
				isOpen={isOpen}
				closeModal={closeModal}
				onSelectImage={() => {
					console.log('onSelect');
					// !TODO: handle select image and open UploadModal
				}}
			/>
		</>
	);
};

export default QuickUploadWrapper;
