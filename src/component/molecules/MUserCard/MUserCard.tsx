import React, { useState } from 'react';
import {
	useUserCard,
	UserCardData,
} from 'src/component/molecules/MUserCard/useUserCard';
import UserCardCompact from './variants/UserCardCompact';
import UserCardDetailed from './variants/UserCardDetailed';
import UserCardMinimal from './variants/UserCardMinimal';
import OFollowListModal from 'src/component/organisms/OFollowListModal/OFollowListModal';

export type UserCardVariant = 'compact' | 'detailed' | 'minimal';

export interface MUserCardProps {
	variant: UserCardVariant;
	user: UserCardData;
	addClass?: string;
	enableFollowModal?: boolean;
}

const MUserCard: React.FC<MUserCardProps> = ({
	variant,
	user,
	addClass = '',
	enableFollowModal = true,
}) => {
	const {
		user: userData,
		isLoggedIn,
		isFollowing,
		onFollowToggle: handleFollowToggle,
	} = useUserCard({
		user,
	});

	const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
	const [defaultModalTab, setDefaultModalTab] = useState<
		'followers' | 'following'
	>('followers');

	const handleFollowersClick = () => {
		if (enableFollowModal) {
			setDefaultModalTab('followers');
			setIsFollowModalOpen(true);
		}
	};

	const handleFollowingClick = () => {
		if (enableFollowModal) {
			setDefaultModalTab('following');
			setIsFollowModalOpen(true);
		}
	};

	const commonProps = {
		user: userData,
		isLoggedIn,
		isFollowing,
		onFollowToggle: handleFollowToggle,
		addClass,
		onFollowersClick: handleFollowersClick,
		onFollowingClick: handleFollowingClick,
		enableFollowModal,
	};

	const renderVariant = () => {
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

	return (
		<>
			{renderVariant()}
			{enableFollowModal && (
				<OFollowListModal
					isOpen={isFollowModalOpen}
					onClose={() => setIsFollowModalOpen(false)}
					userId={user.username}
					defaultTab={defaultModalTab}
				/>
			)}
		</>
	);
};

export default MUserCard;
