import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IMeme } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useEffect, useState } from 'react';
import { ESourceType, trackingMeme } from 'src/service/meme';
import Masonry from 'react-masonry-css';
import { getMemeIdFromUrl } from 'src/utils/memeViewUtils';

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

	// Handle browser back/forward button and initial URL state
	useEffect(() => {
		const handlePopState = () => {
			const memeId = getMemeIdFromUrl();
			if (memeId && !isOpen) {
				// URL has meme ID but modal is closed - open it
				const meme = imageArray.find((img) => img._id === memeId);
				if (meme) {
					setDataImage(meme);
					openModal();
				}
			} else if (!memeId && isOpen) {
				// URL has no meme ID but modal is open - close it
				closeModal();
			}
		};

		window.addEventListener('popstate', handlePopState);

		// Check initial URL state
		handlePopState();

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [imageArray, isOpen, openModal, closeModal]);

	// Check URL when images first load or update
	useEffect(() => {
		const memeId = getMemeIdFromUrl();
		if (memeId && !isOpen && imageArray.length > 0) {
			const meme = imageArray.find((img) => img._id === memeId);
			if (meme) {
				setDataImage(meme);
				openModal();
			}
		}
	}, [imageArray, isOpen, openModal]);

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
