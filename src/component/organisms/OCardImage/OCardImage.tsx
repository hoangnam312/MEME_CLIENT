import { faCircleCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import useCopyImage from 'src/hooks/useCopy';
import './style.css';
import { IImage } from 'src/constants/type';
import { trackingMeme } from 'src/service/meme';

export interface OCardImagePropsType {
	data: IImage;
	addClassWrapper?: string;
	addClassImage?: string;
	onClick?: () => void;
}

export const OCardImage = ({
	data,
	addClassWrapper = '',
	addClassImage = '',
	onClick,
}: OCardImagePropsType) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isCopy, setIsCopy] = useState<boolean>(false);
	const { copyImage } = useCopyImage();

	const handleCopy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		if (await copyImage(data.imageMedium)) {
			setIsCopy(true);
			trackingMeme({
				memeId: data._id,
				action: 'copy',
			});
		}
	};

	return (
		<div
			className={`relative h-fit ${addClassWrapper} `}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => {
				setIsCopy(false);
				setIsHover(false);
			}}
			onClick={() => {
				if (onClick) onClick();
			}}
		>
			<img
				className={`w-full rounded-2xl object-cover hover:drop-shadow-2xl ${addClassImage}`}
				src={data.imageSmall}
				alt={data.imageSmall}
			/>
			{isHover && (
				<div className="box-shadow-image absolute inset-0 flex items-end  justify-end">
					<div className="mb-2 mr-2">
						<AButton onClick={handleCopy}>
							{isCopy ? (
								<FontAwesomeIcon icon={faCircleCheck} />
							) : (
								<FontAwesomeIcon icon={faCopy} />
							)}
						</AButton>
					</div>
				</div>
			)}
		</div>
	);
};
