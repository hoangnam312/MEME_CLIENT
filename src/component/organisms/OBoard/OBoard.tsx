import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IMeme } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useState } from 'react';
import { ESourceType, trackingMeme } from 'src/service/meme';

export interface OBoardPropsType {
	imageArray: IMeme[];
	addClass?: string;
	addClassWrapperImage?: string;
}

export const OBoard = ({
	imageArray,
	addClass = 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6',
	addClassWrapperImage = 'mb-4',
}: OBoardPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const [dataImage, setDataImage] = useState<IMeme>();

	const handleClick = (item: IMeme) => {
		trackingMeme(
			{
				memeId: item._id,
				action: 'view',
			},
			{
				sourceType: ESourceType.Feed,
			}
		);
		openModal();
		setDataImage(item);
	};

	return (
		<div className={addClass}>
			{imageArray?.map((item) => (
				<OCardImage
					key={item._id}
					data={item}
					addClassWrapper={addClassWrapperImage}
					onClick={() => handleClick(item)}
				/>
			))}
			{dataImage && (
				<OViewImage isOpen={isOpen} closeModal={closeModal} data={dataImage} />
			)}
		</div>
	);
};
