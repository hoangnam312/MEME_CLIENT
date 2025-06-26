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

export const Compact: Story = {
	args: {
		variant: 'compact',
		user: sampleUser,
		isFollowing: false,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const CompactFollowing: Story = {
	args: {
		variant: 'compact',
		user: sampleUser,
		isFollowing: true,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const Detailed: Story = {
	args: {
		variant: 'detailed',
		user: sampleUser,
		isFollowing: false,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const DetailedFollowing: Story = {
	args: {
		variant: 'detailed',
		user: sampleUser,
		isFollowing: true,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const Minimal: Story = {
	args: {
		variant: 'minimal',
		user: sampleUser,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const WithoutVerification: Story = {
	args: {
		variant: 'detailed',
		user: {
			...sampleUser,
			verified: false,
		},
		isFollowing: false,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};
