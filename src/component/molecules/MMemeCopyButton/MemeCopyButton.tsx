import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCopy,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import AButton from '../../atoms/AButton/AButton';
import ALoading from '../../atoms/ALoading/ALoading';
import useCopyImage from 'src/hooks/useCopy';
import { IImage } from 'src/constants/type';
import { trackingMeme } from 'src/service/meme';

export enum CopyState {
	Idle = 'idle',
	Copying = 'copying',
	Success = 'success',
	Failure = 'failure',
}

interface MemeCopyButtonProps {
	data: IImage;
}

const MemeCopyButton = ({ data }: MemeCopyButtonProps) => {
	const [copyState, setCopyState] = useState<CopyState>(CopyState.Idle);
	const { copyImage } = useCopyImage();
	let copyTimeout: NodeJS.Timeout | null = null;

	const handleCopy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		setCopyState(CopyState.Copying);
		try {
			const result = await copyImage(data.location);
			if (result) {
				setCopyState(CopyState.Success);
				trackingMeme({
					memeId: data._id,
					action: 'copy',
				});
			} else {
				setCopyState(CopyState.Failure);
			}
		} catch (error) {
			setCopyState(CopyState.Failure);
		}
		if (copyTimeout) clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			setCopyState(CopyState.Idle);
		}, 3000);
	};

	return (
		<AButton onClick={handleCopy} isDisabled={copyState === CopyState.Copying}>
			{copyState === CopyState.Copying ? (
				<ALoading size="lg" />
			) : copyState === CopyState.Success ? (
				<FontAwesomeIcon icon={faCircleCheck} />
			) : copyState === CopyState.Failure ? (
				<FontAwesomeIcon icon={faCircleXmark} />
			) : (
				<FontAwesomeIcon icon={faCopy} />
			)}
		</AButton>
	);
};

export default MemeCopyButton;
