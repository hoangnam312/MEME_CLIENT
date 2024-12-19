import type { Meta, StoryObj } from '@storybook/react';

import OquickUpload from './OQuickUpload';

const meta = {
	component: OquickUpload,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OquickUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		closeModal: () => {
			console.log('close');
		},
		onSelectImage: () => {
			console.log('onSelectImage');
		},
	},
};
