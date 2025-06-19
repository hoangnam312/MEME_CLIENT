import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AButton from '../atoms/AButton/AButton';
import { IImage } from 'src/constants/type';
import { trackingMeme } from 'src/service/meme';

// Like bounce state enum
export enum LikeBounceState {
	None = 'none',
	Like = 'like',
	Unlike = 'unlike',
}

interface MemeLikeButtonProps {
	data: IImage;
}

const MemeLikeButton = ({ data }: MemeLikeButtonProps) => {
	const [liked, setLiked] = useState(false);
	const [likeBounce, setLikeBounce] = useState(LikeBounceState.None);

	const handleLike = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		// TODO: call api to like
		// TODO: call api to tracking
		// fake api
		trackingMeme({
			memeId: data._id,
			action: 'like',
		});
		if (!liked) {
			setLikeBounce(LikeBounceState.Like);
			setTimeout(() => {
				setLikeBounce(LikeBounceState.None);
				setLiked(true);
			}, 1000);
		} else {
			setLikeBounce(LikeBounceState.Unlike);
			setTimeout(() => {
				setLikeBounce(LikeBounceState.None);
				setLiked(false);
			}, 1000);
		}
	};

	if (!liked && likeBounce === LikeBounceState.None) {
		return (
			<AButton onClick={handleLike} isDisabled={false}>
				<FontAwesomeIcon icon={faThumbsUp} className="text-white" />
			</AButton>
		);
	}
	if (!liked && likeBounce === LikeBounceState.Like) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faThumbsUp} bounce />
			</AButton>
		);
	}
	if (liked && likeBounce === LikeBounceState.None) {
		return (
			<AButton onClick={handleLike} isDisabled={false}>
				<FontAwesomeIcon icon={faThumbsUp} />
			</AButton>
		);
	}
	if (liked && likeBounce === LikeBounceState.Unlike) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faThumbsUp} bounce />
			</AButton>
		);
	}
	return null;
};

export default MemeLikeButton;
