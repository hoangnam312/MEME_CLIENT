import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AButton from '../../atoms/AButton/AButton';
import { IMeme } from 'src/constants/type';
import { ESourceType, trackingMeme } from 'src/service/meme';

// Like bounce state enum
export enum LikeBounceState {
	None = 'none',
	Like = 'like',
	Unlike = 'unlike',
}

interface MemeLikeButtonProps {
	data: IMeme;
	sourceType?: ESourceType;
}

const MemeLikeButton = ({ data, sourceType }: MemeLikeButtonProps) => {
	const [liked, setLiked] = useState(data.hasLiked ?? false);
	const [likeBounce, setLikeBounce] = useState(LikeBounceState.None);

	const handleLike = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		trackingMeme(
			{
				memeId: data._id,
				action: 'like',
			},
			{
				sourceType: sourceType,
			}
		);
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

	useEffect(() => {
		setLiked(data?.hasLiked ?? false);
	}, [data.hasLiked]);

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
