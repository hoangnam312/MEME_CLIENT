import type { Meta, StoryObj } from '@storybook/react';
import MUserCard from './MUserCard';

const meta = {
	component: MUserCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['compact', 'detailed', 'minimal'],
		},
	},
} satisfies Meta<typeof MUserCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleUser = {
	avatarUrl:
		'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
	username: 'Jese Leos',
	followCount: 1250,
	followingCount: 180,
	bio: 'Meme enthusiast and digital creator. Spreading joy through humor! 🎭✨',
	joinDate: 'March 2023',
	verified: true,
};

const sampleFollowers = [
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
];

const sampleFollowing = [
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Diana Prince',
		followCount: 500,
		followingCount: 50,
		bio: 'Content creator',
		verified: true,
	},
	{
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Eve Wilson',
		followCount: 300,
		followingCount: 120,
		bio: 'Digital artist',
	},
];

export const Compact: Story = {
	args: {
		variant: 'compact',
		user: sampleUser,
	},
};

export const CompactWithModal: Story = {
	args: {
		variant: 'compact',
		user: sampleUser,
		enableFollowModal: true,
		followers: sampleFollowers,
		following: sampleFollowing,
	},
};

export const Detailed: Story = {
	args: {
		variant: 'detailed',
		user: sampleUser,
	},
};

export const DetailedWithModal: Story = {
	args: {
		variant: 'detailed',
		user: sampleUser,
		enableFollowModal: true,
		followers: sampleFollowers,
		following: sampleFollowing,
	},
};

export const Minimal: Story = {
	args: {
		variant: 'minimal',
		user: sampleUser,
	},
};

export const WithoutVerification: Story = {
	args: {
		variant: 'detailed',
		user: {
			...sampleUser,
			verified: false,
		},
	},
};
