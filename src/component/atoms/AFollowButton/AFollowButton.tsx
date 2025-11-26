import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AButton from '../AButton/AButton';
import { useAuthen } from 'src/hooks/useAuthen';
import { t } from 'i18next';

// Follow bounce state enum
export enum FollowBounceState {
	None = 'none',
	Follow = 'follow',
	Unfollow = 'unfollow',
}

export interface AFollowButtonProps {
	isFollowing?: boolean;
	onFollowToggle?: (isFollowing: boolean) => void;
	addClass?: string;
}

const AFollowButton: React.FC<AFollowButtonProps> = ({
	isFollowing = false,
	onFollowToggle,
	addClass = '',
}) => {
	const { isLoggedIn } = useAuthen();
	const [internalFollowing, setInternalFollowing] = useState(isFollowing);
	const [followBounce, setFollowBounce] = useState(FollowBounceState.None);

	const handleFollowToggle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();

		if (!internalFollowing) {
			setFollowBounce(FollowBounceState.Follow);
			setTimeout(() => {
				setFollowBounce(FollowBounceState.None);
				setInternalFollowing(true);
				onFollowToggle?.(true);
			}, 1000);
		} else {
			setFollowBounce(FollowBounceState.Unfollow);
			setTimeout(() => {
				setFollowBounce(FollowBounceState.None);
				setInternalFollowing(false);
				onFollowToggle?.(false);
			}, 1000);
		}
	};

	if (!isLoggedIn()) return null;

	// Not following, normal state
	if (!internalFollowing && followBounce === FollowBounceState.None) {
		return (
			<AButton
				onClick={handleFollowToggle}
				isDisabled={false}
				addClass={`text-xs md:text-sm ${addClass}`}
			>
				<FontAwesomeIcon
					icon={faUserPlus}
					className="mr-1 text-xs md:mr-2 md:text-sm"
				/>
				{t('follow')}
			</AButton>
		);
	}

	// Not following, bounce animation
	if (!internalFollowing && followBounce === FollowBounceState.Follow) {
		return (
			<AButton isDisabled={true} addClass={`text-xs md:text-sm ${addClass}`}>
				<FontAwesomeIcon
					icon={faUserPlus}
					bounce
					className="mr-1 text-xs md:mr-2 md:text-sm"
				/>
				{t('follow')}
			</AButton>
		);
	}

	// Following, normal state
	if (internalFollowing && followBounce === FollowBounceState.None) {
		return (
			<AButton
				onClick={handleFollowToggle}
				isDisabled={false}
				addClass={`!bg-emerald-200 hover:!bg-emerald-300 transition-colors duration-200 text-xs md:text-sm ${addClass}`}
			>
				<FontAwesomeIcon
					icon={faCheckDouble}
					className="mr-1 text-xs md:mr-2 md:text-sm"
				/>
				{t('following')}
			</AButton>
		);
	}

	// Following, bounce animation
	if (internalFollowing && followBounce === FollowBounceState.Unfollow) {
		return (
			<AButton
				isDisabled={true}
				addClass={`!bg-emerald-200 text-xs md:text-sm ${addClass}`}
			>
				<FontAwesomeIcon
					icon={faCheckDouble}
					bounce
					className="mr-1 text-xs md:mr-2 md:text-sm"
				/>
				{t('following')}
			</AButton>
		);
	}

	return null;
};

export default AFollowButton;
