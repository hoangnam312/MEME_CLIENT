import { faCircleCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import useCopyImage from 'src/hooks/useCopy';
import './style.css';

export interface OCardImagePropsType {
	imagePath: string;
	addClassWrapper?: string;
	addClassImage?: string;
	onClick?: () => void;
}

export const OCardImage = ({
	imagePath,
	addClassWrapper = '',
	addClassImage = '',
	onClick,
}: OCardImagePropsType) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isCopy, setIsCopy] = useState<boolean>(false);
	const { copyImage } = useCopyImage();

	const handleCopy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		if (await copyImage(imagePath)) setIsCopy(true);
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
				src={imagePath}
				alt="viteIcon"
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
