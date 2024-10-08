import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IImage } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useState } from 'react';

const baseImage = import.meta.env.VITE_BASE_IMAGE;

export interface OBoardPropsType {
	imageArray: IImage[];
	addClass?: string;
	addClassWrapperImage?: string;
}

export const OBoard = ({
	imageArray,
	addClass = 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6',
	addClassWrapperImage = 'mb-4',
}: OBoardPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const [dataImage, setDataImage] = useState<IImage>();

	const handleClick = (item: IImage) => {
		openModal();
		setDataImage(item);
	};

	return (
		<div className={addClass}>
			{imageArray.map((item, index) => (
				<OCardImage
					key={index}
					imagePath={baseImage + item.imagePath}
					addClassWrapper={addClassWrapperImage}
					onClick={() => handleClick(item)}
				/>
			))}
			<OViewImage
				isOpen={isOpen}
				closeModal={closeModal}
				data={dataImage}
				onSelectImage={() => {
					console.log('onSelect');
				}}
			/>
		</div>
	);
};
