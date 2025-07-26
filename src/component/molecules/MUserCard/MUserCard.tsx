import React, { useState } from 'react';
import { useUserCard, UserCardData } from 'src/hooks/useUserCard';
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

// Sample data for testing purposes
const sampleFollowers: UserCardData[] = [
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Alice Johnson',
		displayName: 'Alice Johnson',
		followCount: 450,
		followingCount: 120,
		bio: 'Digital artist and meme creator 🎨',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Bob Smith',
		displayName: 'Bob Smith',
		followCount: 280,
		followingCount: 350,
		bio: 'Comedy enthusiast and content creator',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Charlie Brown',
		displayName: 'Charlie Brown',
		followCount: 150,
		followingCount: 200,
		bio: 'Meme collector and social media manager',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Diana Prince',
		displayName: 'Diana Prince',
		followCount: 850,
		followingCount: 95,
		bio: 'Professional photographer and visual storyteller',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Eve Wilson',
		displayName: 'Eve Wilson',
		followCount: 320,
		followingCount: 180,
		bio: 'UX designer who loves funny memes',
	},
];

const sampleFollowing: UserCardData[] = [
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Frank Miller',
		displayName: 'Frank Miller',
		followCount: 1200,
		followingCount: 50,
		bio: 'Viral content creator and comedian',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Grace Lee',
		displayName: 'Grace Lee',
		followCount: 680,
		followingCount: 220,
		bio: 'Tech blogger and meme enthusiast',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Henry Davis',
		displayName: 'Henry Davis',
		followCount: 95,
		followingCount: 450,
		bio: 'Student and part-time meme curator',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Ivy Chen',
		displayName: 'Ivy Chen',
		followCount: 2100,
		followingCount: 180,
		bio: 'Social media influencer and brand strategist',
	},
];

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
	const [followers, setFollowers] = useState<UserCardData[]>([]);
	const [following, setFollowing] = useState<UserCardData[]>([]);

	const handleFollowersClick = () => {
		if (enableFollowModal) {
			setDefaultModalTab('followers');
			setIsFollowModalOpen(true);
			// Using sample data for testing - replace with API call
			setFollowers(sampleFollowers);
		}
	};

	const handleFollowingClick = () => {
		if (enableFollowModal) {
			setDefaultModalTab('following');
			setIsFollowModalOpen(true);
			// Using sample data for testing - replace with API call
			setFollowing(sampleFollowing);
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
					followers={followers}
					following={following}
					defaultTab={defaultModalTab}
				/>
			)}
		</>
	);
};

export default MUserCard;
