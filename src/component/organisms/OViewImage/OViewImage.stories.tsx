import type { Meta, StoryObj } from '@storybook/react';

import OViewImage from './OViewImage';

const meta = {
	component: OViewImage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OViewImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		data: {
			imagePath: '',
			tag: '',
			name: 'name',
		},
		closeModal: () => {
			console.log('close');
		},
		onSelectImage: () => {
			console.log('onSelectImage');
		},
	},
};
