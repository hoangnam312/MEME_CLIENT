import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import AButton from '../atoms/AButton/AButton';
import { IImage } from 'src/constants/type';
import { trackingMeme } from 'src/service/meme';

// Album bounce state enum
export enum AlbumBounceState {
	None = 'none',
	Add = 'add',
	Remove = 'remove',
}

interface MemeAlbumButtonProps {
	data: IImage;
}

const MemeAlbumButton = ({ data }: MemeAlbumButtonProps) => {
	const [addedToAlbum, setAddedToAlbum] = useState(false);
	const [albumBounce, setAlbumBounce] = useState(AlbumBounceState.None);

	const handleAddToAlbum = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		// TODO: call api add to album
		// TODO: call api to tracking
		// fake api
		trackingMeme({
			memeId: data._id,
			action: 'add-to-album',
		});
		e.stopPropagation();
		if (!addedToAlbum) {
			setAlbumBounce(AlbumBounceState.Add);
			setTimeout(() => {
				setAlbumBounce(AlbumBounceState.None);
				setAddedToAlbum(true);
			}, 1000);
		} else {
			setAlbumBounce(AlbumBounceState.Remove);
			setTimeout(() => {
				setAlbumBounce(AlbumBounceState.None);
				setAddedToAlbum(false);
			}, 1000);
		}
	};

	if (!addedToAlbum && albumBounce === AlbumBounceState.None) {
		return (
			<AButton onClick={handleAddToAlbum} isDisabled={false}>
				<FontAwesomeIcon icon={faPlusSquare} className="text-white" />
			</AButton>
		);
	}
	if (!addedToAlbum && albumBounce === AlbumBounceState.Add) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faPlusSquare} bounce />
			</AButton>
		);
	}
	if (addedToAlbum && albumBounce === AlbumBounceState.None) {
		return (
			<AButton onClick={handleAddToAlbum} isDisabled={false}>
				<FontAwesomeIcon icon={faSquareCheck} />
			</AButton>
		);
	}
	if (addedToAlbum && albumBounce === AlbumBounceState.Remove) {
		return (
			<AButton isDisabled={true}>
				<FontAwesomeIcon icon={faPlusSquare} bounce />
			</AButton>
		);
	}
	return null;
};

export default MemeAlbumButton;
