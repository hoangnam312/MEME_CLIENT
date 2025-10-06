import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IMeme } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useState } from 'react';
import { ESourceType, trackingMeme } from 'src/service/meme';
import Masonry from 'react-masonry-css';
import './style.css';

export interface OBoardPropsType {
	imageArray: IMeme[];
	addClass?: string;
	addClassWrapperImage?: string;
}

export const OBoard = ({ imageArray, addClass = '' }: OBoardPropsType) => {
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

	const breakpointColumns = {
		default: 4,
		1536: 5,
		1280: 4,
		1024: 3,
		768: 2,
		640: 2,
	};

	return (
		<>
			<Masonry
				breakpointCols={breakpointColumns}
				className={`masonry-grid ${addClass}`}
				columnClassName="masonry-grid_column"
			>
				{imageArray?.map((item, index) => (
					<div
						key={item._id}
						// className={addClassWrapperImage}
						className="aspect-auto h-auto"
					>
						<OCardImage
							index={index}
							data={item}
							onClick={() => handleClick(item)}
						/>
					</div>
				))}
			</Masonry>
			{dataImage && (
				<OViewImage isOpen={isOpen} closeModal={closeModal} data={dataImage} />
			)}
		</>
	);
};
