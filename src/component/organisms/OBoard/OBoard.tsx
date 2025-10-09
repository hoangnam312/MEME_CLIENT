import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IMeme } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useState } from 'react';
import { ESourceType, trackingMeme } from 'src/service/meme';
import Masonry from 'react-masonry-css';

export interface OBoardPropsType {
	imageArray: IMeme[];
	addClass?: string;
	addClassWrapperImage?: string;
}

export const OBoard = ({
	imageArray,
	addClass = '',
	addClassWrapperImage,
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

	const breakpointColumns = {
		default: 6,
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
				className={`-ml-8 flex w-auto ${addClass}`}
				columnClassName="pl-8 [background-clip:padding-box] [&>div]:mb-8"
			>
				{imageArray?.map((item, index) => (
					<div
						key={item._id}
						className={`aspect-auto h-auto ${addClassWrapperImage}`}
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
