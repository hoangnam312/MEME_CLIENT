import { useState } from 'react';
import { typeModal } from 'src/constants/type';

const useCheckModalOpening = () => {
	const [modalOpening, setModalOpening] = useState<typeModal>(typeModal.NONE);
	const updateModalOpening = (type: typeModal) => {
		setModalOpening(type);
	};

	return { modalOpening, updateModalOpening };
};

export default useCheckModalOpening;
