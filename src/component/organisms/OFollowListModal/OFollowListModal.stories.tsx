import type { Meta, StoryObj } from '@storybook/react';
import OFollowListModal from './OFollowListModal';

const meta = {
	component: OFollowListModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OFollowListModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleUsers = [
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Alice Johnson',
		followCount: 250,
		followingCount: 180,
		bio: 'Designer & meme creator',
		verified: true,
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Bob Smith',
		followCount: 120,
		followingCount: 95,
		bio: 'Comedy enthusiast',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Charlie Brown',
		followCount: 80,
		followingCount: 200,
		bio: 'Meme collector',
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Diana Prince',
		followCount: 500,
		followingCount: 50,
		bio: 'Content creator',
		verified: true,
	},
];

export const WithFollowersAndFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		followers: sampleUsers,
		following: sampleUsers.slice(0, 2),
		defaultTab: 'followers',
	},
};

export const DefaultToFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		followers: sampleUsers,
		following: sampleUsers.slice(0, 3),
		defaultTab: 'following',
	},
};

export const EmptyFollowers: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		followers: [],
		following: sampleUsers.slice(0, 2),
		defaultTab: 'followers',
	},
};

export const EmptyFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		followers: sampleUsers.slice(0, 2),
		following: [],
		defaultTab: 'following',
	},
};

export const BothEmpty: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		followers: [],
		following: [],
		defaultTab: 'followers',
	},
};
