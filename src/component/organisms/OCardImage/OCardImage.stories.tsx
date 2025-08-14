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
		data: {
			_id: '1',
			name: 'Sample Meme',
			description: 'A sample meme for testing',
			tag: 'sample,test',
			location:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			__v: 0,
			imageMedium:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			imageSmall:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			imageOrigin:
				'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			viewCount: 0,
			likeCount: 0,
			copyCount: 0,
			dislikeCount: 0,
			userId: '1',
			// Add missing required properties
			image: {
				imageOrigin:
					'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
				imageMedium:
					'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
				imageSmall:
					'https://images.unsplash.com/photo-1554895391-6035683c7190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
			},
			stats: {
				viewCount: 0,
				likeCount: 0,
				copyCount: 0,
				dislikeCount: 0,
			},
			status: 'active' as const,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	},
};
