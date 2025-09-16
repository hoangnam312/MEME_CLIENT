import useOpen from 'src/hooks/useOpen';
import { OCardImage } from '../OCardImage/OCardImage';
import { IMeme } from 'src/constants/type';
import OViewImage from '../OViewImage/OViewImage';
import { useState, useEffect, useRef } from 'react';
import { ESourceType, trackingMeme } from 'src/service/meme';

export interface OBoardPropsType {
	imageArray: IMeme[];
	addClass?: string;
	addClassWrapperImage?: string;
}

interface GridItem extends IMeme {
	rowSpan?: number;
}

export const OBoard = ({
	imageArray,
	addClass = '',
	addClassWrapperImage = '',
}: OBoardPropsType) => {
	const { isOpen, openModal, closeModal } = useOpen();
	const [dataImage, setDataImage] = useState<IMeme>();
	const [gridItems, setGridItems] = useState<GridItem[]>([]);
	const gridRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const calculateRowSpan = async () => {
			const rowHeight = 50;
			const rowGap = 50;
			const items: GridItem[] = [];

			for (const item of imageArray) {
				const img = new Image();
				await new Promise((resolve) => {
					img.onload = resolve;
					img.onerror = resolve;
					img.src = item.image.imageSmall;
				});

				const aspectRatio = img.naturalHeight / img.naturalWidth;
				const gridWidth = 250;
				const contentHeight = gridWidth * aspectRatio;
				const rowSpan = Math.ceil(
					(contentHeight + rowGap) / (rowHeight + rowGap)
				);

				items.push({
					...item,
					rowSpan,
				});
			}

			setGridItems(items);
		};

		if (imageArray.length > 0) {
			calculateRowSpan();
		}
	}, [imageArray]);

	return (
		<div
			ref={gridRef}
			className={`grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ${addClass}`}
		>
			{gridItems?.map((item, index) => (
				<div
					key={item._id}
					className={addClassWrapperImage}
					style={{
						gridRowEnd: `span ${item.rowSpan || 20}`,
					}}
				>
					<OCardImage
						index={index}
						data={item}
						onClick={() => handleClick(item)}
					/>
				</div>
			))}
			{dataImage && (
				<OViewImage isOpen={isOpen} closeModal={closeModal} data={dataImage} />
			)}
		</div>
	);
};
