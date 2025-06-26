import React from 'react';
import { useUserCard, UserCardData } from 'src/hooks/useUserCard';
import UserCardCompact from './variants/UserCardCompact';
import UserCardDetailed from './variants/UserCardDetailed';
import UserCardMinimal from './variants/UserCardMinimal';

export type UserCardVariant = 'compact' | 'detailed' | 'minimal';

export interface MUserCardProps {
	variant: UserCardVariant;
	user: UserCardData;
	addClass?: string;
}

const MUserCard: React.FC<MUserCardProps> = ({
	variant,
	user,
	addClass = '',
}) => {
	const {
		user: userData,
		isLoggedIn,
		isFollowing,
		onFollowToggle: handleFollowToggle,
	} = useUserCard({
		user,
	});

	const commonProps = {
		user: userData,
		isLoggedIn,
		isFollowing,
		onFollowToggle: handleFollowToggle,
		addClass,
	};

	switch (variant) {
		case 'compact':
			return <UserCardCompact {...commonProps} />;
		case 'detailed':
			return <UserCardDetailed {...commonProps} />;
		case 'minimal':
			return <UserCardMinimal {...commonProps} />;
		default:
			return <UserCardCompact {...commonProps} />;
	}
};

export default MUserCard;
