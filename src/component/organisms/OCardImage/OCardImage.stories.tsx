import type { Meta, StoryObj } from '@storybook/react';

import { OCardImage } from './OCardImage';

const meta = {
	component: OCardImage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OCardImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		imagePath:
			'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
	},
};
