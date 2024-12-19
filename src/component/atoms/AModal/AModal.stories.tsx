import type { Meta, StoryObj } from '@storybook/react';

import Amodal from './AModal';

const meta = {
	component: Amodal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Amodal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		closeModal: () => {
			console.log('close');
		},
		children: <div> children </div>,
	},
};
