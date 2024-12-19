import type { Meta, StoryObj } from '@storybook/react';

import OuploadModal from './OUploadModal';

const meta = {
	component: OuploadModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OuploadModal>;

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
