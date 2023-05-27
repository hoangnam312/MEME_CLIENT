import {
	faCircleCheck,
	faCopy,
	faHashtag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';

export interface OCardImagePropsType {
	imagePath: string;
	addClassWrapper?: string;
	addClassImage?: string;
}

export const OCardImage = ({
	imagePath,
	addClassWrapper,
	addClassImage,
}: OCardImagePropsType) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isCopy, setIsCopy] = useState<boolean>(false);

	return (
		<div
			className={`relative h-fit ${addClassWrapper}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => {
				setIsCopy(false);
				setIsHover(false);
			}}
		>
			<img
				className={`w-full rounded-2xl object-cover hover:drop-shadow-2xl ${addClassImage}`}
				src={imagePath}
				alt="viteIcon"
			/>
			{isHover && (
				<div className="absolute inset-0 flex items-end justify-end bg-black bg-opacity-50">
					<div className="mb-2 mr-2">
						<AButton addClass="mb-2" onClick={() => setIsCopy(true)}>
							{isCopy ? (
								<FontAwesomeIcon icon={faCircleCheck} />
							) : (
								<FontAwesomeIcon icon={faCopy} />
							)}
						</AButton>
						<AButton>
							<FontAwesomeIcon icon={faHashtag} />
						</AButton>
					</div>
				</div>
			)}
		</div>
	);
};
