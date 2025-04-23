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
			_id: '1',
			imageMedium:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			imageSmall:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			location:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			viewCount: 0,
			likeCount: 0,
			copyCount: 0,
			userId: '1',
			__v: 0,
		},
		closeModal: () => {
			console.log('close');
		},
	},
};
