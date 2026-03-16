import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import OUploadModal from 'src/component/organisms/OUploadModal/OUploadModal';
import { typeModal } from 'src/constants/type';
import useOpen from 'src/hooks/useOpen';
import { ignorePath } from './config';

export interface QuickUploadWrapperPropsType {
	children: ReactNode;
	modalOpening: typeModal;
	updateModalOpening: (type: typeModal) => void;
}

const QuickUploadWrapper = ({
	children,
	modalOpening,
	updateModalOpening,
}: QuickUploadWrapperPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const { pathname } = useLocation();

	useEffect(() => {
		if (isOpen) updateModalOpening(typeModal.QUICK_UPLOAD);
		else updateModalOpening(typeModal.NONE);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const handleDrag = () => {
		if (ignorePath.includes(pathname)) return;
		if (modalOpening === typeModal.NONE) openModal();
	};

	return (
		<>
			<div onDragEnter={handleDrag}>{children}</div>
			<OUploadModal isOpen={isOpen} closeModal={closeModal} />
		</>
	);
};

export default QuickUploadWrapper;
