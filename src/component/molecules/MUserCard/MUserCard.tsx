import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
	useUserCard,
	UserCardData,
} from 'src/component/molecules/MUserCard/useUserCard';
import UserCardCompact from './variants/UserCardCompact';
import UserCardDetailed from './variants/UserCardDetailed';
import UserCardMinimal from './variants/UserCardMinimal';
import OFollowListModal from 'src/component/organisms/OFollowListModal/OFollowListModal';
import { Path } from 'src/constants/type';

export type UserCardVariant = 'compact' | 'detailed' | 'minimal';

export interface MUserCardProps {
	variant: UserCardVariant;
	user: UserCardData;
	addClass?: string;
	enableFollowModal?: boolean;
	enableProfileLink?: boolean;
}

const MUserCard: React.FC<MUserCardProps> = ({
	variant,
	user,
	addClass = '',
	enableFollowModal = true,
	enableProfileLink = true,
}) => {
	const navigate = useNavigate();
	const {
		user: userData,
		isLoggedIn,
		isMyself,
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

	const handleUserClick = () => {
		if (enableProfileLink) {
			navigate(`${Path.USER_PROFILE}/${user.id}`);
		}
	};

	const commonProps = {
		user: userData,
		isShowFollowButton: isLoggedIn && !isMyself,
		isFollowing,
		onFollowToggle: handleFollowToggle,
		addClass,
		onFollowersClick: handleFollowersClick,
		onFollowingClick: handleFollowingClick,
		enableFollowModal,
		onUserClick: enableProfileLink ? handleUserClick : undefined,
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
					userId={user.id}
					defaultTab={defaultModalTab}
				/>
			)}
		</>
	);
};

export default MUserCard;
