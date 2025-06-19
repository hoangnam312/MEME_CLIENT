import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import AButton from '../atoms/AButton/AButton';
import { IImage } from 'src/constants/type';
import { trackingMeme } from 'src/service/meme';

// Dislike bounce state enum
export enum DislikeBounceState {
	None = 'none',
	Dislike = 'dislike',
	Undislike = 'undislike',
}

interface MemeDislikeButtonProps {
	data: IImage;
}

const MemeDislikeButton = ({ data }: MemeDislikeButtonProps) => {
	const [disliked, setDisliked] = useState(false);
	const [dislikeBounce, setDislikeBounce] = useState(DislikeBounceState.None);

	const handleDislike = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		// TODO: call api to dislike
		// TODO: call api to tracking
		// fake api
		trackingMeme({
			memeId: data._id,
			action: 'dislike',
		});
		if (!disliked) {
			setDislikeBounce(DislikeBounceState.Dislike);
			setTimeout(() => {
				setDislikeBounce(DislikeBounceState.None);
				setDisliked(true);
			}, 1000);
		} else {
			setDislikeBounce(DislikeBounceState.Undislike);
			setTimeout(() => {
				setDislikeBounce(DislikeBounceState.None);
				setDisliked(false);
			}, 1000);
		}
	};

	if (!disliked && dislikeBounce === DislikeBounceState.None) {
		return (
			<AButton onClick={handleDislike} isDisabled={false}>
				<FontAwesomeIcon icon={faThumbsDown} className="text-white" />
			</AButton>
		);
	}
	if (!disliked && dislikeBounce === DislikeBounceState.Dislike) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faThumbsDown} bounce className="text-red-400" />
			</AButton>
		);
	}
	if (disliked && dislikeBounce === DislikeBounceState.None) {
		return (
			<AButton onClick={handleDislike} isDisabled={false}>
				<FontAwesomeIcon icon={faThumbsDown} className="text-red-400" />
			</AButton>
		);
	}
	if (disliked && dislikeBounce === DislikeBounceState.Undislike) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faThumbsDown} bounce />
			</AButton>
		);
	}
	return null;
};

export default MemeDislikeButton;
