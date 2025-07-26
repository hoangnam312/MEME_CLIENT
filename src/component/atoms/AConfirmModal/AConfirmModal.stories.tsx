import type { Meta, StoryObj } from '@storybook/react';
import AConfirmModal from './AConfirmModal';

const meta: Meta<typeof AConfirmModal> = {
	title: 'Atoms/AConfirmModal',
	component: AConfirmModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		isOpen: { control: 'boolean' },
		isDangerous: { control: 'boolean' },
		isLoading: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		title: 'Confirm Action',
		message: 'Are you sure you want to proceed with this action?',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
		isDangerous: false,
		isLoading: false,
		onClose: () => console.log('Modal closed'),
		onConfirm: () => console.log('Action confirmed'),
	},
};

export const Dangerous: Story = {
	args: {
		isOpen: true,
		title: 'Delete Account',
		message:
			'This action cannot be undone. Are you sure you want to delete your account?',
		confirmText: 'Yes, Delete Account',
		cancelText: 'Cancel',
		isDangerous: true,
		isLoading: false,
		onClose: () => console.log('Modal closed'),
		onConfirm: () => console.log('Account deletion confirmed'),
	},
};

export const Loading: Story = {
	args: {
		isOpen: true,
		title: 'Delete Account',
		message:
			'This action cannot be undone. Are you sure you want to delete your account?',
		confirmText: 'Yes, Delete Account',
		cancelText: 'Cancel',
		isDangerous: true,
		isLoading: true,
		onClose: () => console.log('Modal closed'),
		onConfirm: () => console.log('Account deletion confirmed'),
	},
};
