import type { Meta, StoryObj } from '@storybook/react';

import { MNavbar } from './MNavbar';

const meta = {
	component: MNavbar,
	// parameters: {
	// 	layout: 'centered',
	// },
	tags: ['autodocs'],
} satisfies Meta<typeof MNavbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		updateModalOpening: () => {
			console.log('updateModalOpening');
		},
	},
};
