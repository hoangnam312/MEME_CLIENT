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

export const WithFollowersAndFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		userId: 'sample-user-id',
		defaultTab: 'followers',
	},
};

export const DefaultToFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		userId: 'sample-user-id',
		defaultTab: 'following',
	},
};

export const EmptyFollowers: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		userId: 'sample-user-id',
		defaultTab: 'followers',
	},
};

export const EmptyFollowing: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		userId: 'sample-user-id',
		defaultTab: 'following',
	},
};

export const BothEmpty: Story = {
	args: {
		isOpen: true,
		onClose: () => console.log('Modal closed'),
		userId: 'sample-user-id',
		defaultTab: 'followers',
	},
};
