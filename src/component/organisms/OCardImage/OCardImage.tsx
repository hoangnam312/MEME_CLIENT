import { useState } from 'react';
import MemeCopyButton from 'src/component/molecules/MMemeCopyButton/MemeCopyButton';
import { IMeme } from 'src/constants/type';
import './style.css';
import { ESourceType } from 'src/service/meme';
import { AImageSkeleton } from 'src/component/atoms/AImageSkeleton/AImageSkeleton';

interface OCardImageProps {
	index: number;
	data: IMeme;
	addClassWrapper?: string;
	addClassImage?: string;
	onClick?: () => void;
}

export const OCardImage = ({
	// index,
	data,
	addClassWrapper = '',
	addClassImage = '',
	onClick,
}: OCardImageProps) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [hasError, setHasError] = useState<boolean>(false);

	const handleMouseLeave = () => {
		setIsHover(false);
	};

	const handleImageLoad = () => {
		setIsLoaded(true);
	};

	const handleImageError = () => {
		setHasError(true);
		setIsLoaded(true);
	};

	return (
		<div
			className={`relative overflow-hidden rounded-2xl ${addClassWrapper} ${
				isHover ? 'shadow-lg' : ''
			}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={handleMouseLeave}
			onClick={() => {
				if (onClick) onClick();
			}}
		>
			<div className="relative w-full">
				{!isLoaded && (
					<div className="absolute inset-0">
						<AImageSkeleton />
					</div>
				)}
				<img
					className={`w-full rounded-2xl object-cover transition-opacity duration-300 hover:drop-shadow-2xl ${
						isLoaded ? 'opacity-100' : 'opacity-0'
					} ${addClassImage}`}
					src={data.image.imageSmall}
					alt={data.name || data.description || 'Meme image'}
					loading="lazy"
					onLoad={handleImageLoad}
					onError={handleImageError}
					style={{ display: 'block', height: 'auto', width: '100%' }}
				/>
				{hasError && (
					<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-100">
						<span className="text-sm text-gray-400">Failed to load</span>
					</div>
				)}
			</div>
			{/* For debug */}
			{/* <div className="absolute left-2 top-2 z-10 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
				{data._id} - {index}
			</div> */}
			{isHover && isLoaded && (
				<div className="box-shadow-image absolute inset-0 flex items-end justify-end">
					<div className="mb-2 mr-2 flex flex-col gap-2">
						<MemeCopyButton data={data} sourceType={ESourceType.Feed} />
					</div>
				</div>
			)}
		</div>
	);
};
