import type { Meta, StoryObj } from '@storybook/react';
import AFollowButton from './AFollowButton';

const meta = {
	component: AFollowButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AFollowButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFollowing: Story = {
	args: {
		isFollowing: false,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};

export const Following: Story = {
	args: {
		isFollowing: true,
		onFollowToggle: (isFollowing) =>
			console.log('Follow toggled:', isFollowing),
	},
};
