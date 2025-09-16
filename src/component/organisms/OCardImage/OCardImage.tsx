import { useState } from 'react';
import MemeCopyButton from 'src/component/molecules/MMemeCopyButton/MemeCopyButton';
import { IMeme } from 'src/constants/type';
import './style.css';
import { ESourceType } from 'src/service/meme';

interface OCardImageProps {
	index: number;
	data: IMeme;
	addClassWrapper?: string;
	addClassImage?: string;
	onClick?: () => void;
}

export const OCardImage = ({
	index,
	data,
	addClassWrapper = '',
	addClassImage = '',
	onClick,
}: OCardImageProps) => {
	const [isHover, setIsHover] = useState<boolean>(false);

	const handleMouseLeave = () => {
		setIsHover(false);
	};

	return (
		<div
			className={`relative h-fit ${addClassWrapper} ${
				isHover ? 'shadow-lg' : ''
			}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={handleMouseLeave}
			onClick={() => {
				if (onClick) onClick();
			}}
		>
			<div className="absolute left-2 top-2 z-10 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
				{data._id} - {index}
			</div>
			<img
				className={`w-full rounded-2xl object-cover hover:drop-shadow-2xl ${addClassImage}`}
				src={data.image.imageSmall}
				alt={data.image.imageSmall}
				loading="lazy"
			/>
			{isHover && (
				<div className="box-shadow-image absolute inset-0 flex items-end justify-end">
					<div className="mb-2 mr-2 flex flex-col gap-2">
						{/* {isLoggedIn() && (
							<>
								<MemeLikeButton data={data} />
								<MemeDislikeButton data={data} />
								<MemeAlbumButton data={data} />
							</>
						)} */}
						<MemeCopyButton data={data} sourceType={ESourceType.Feed} />
					</div>
				</div>
			)}
		</div>
	);
};
