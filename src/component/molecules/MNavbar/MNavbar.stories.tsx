import type { Meta, StoryObj } from '@storybook/react';

import { MNavbar } from './MNavbar';
import { BrowserRouter } from 'react-router';

const meta = {
	component: MNavbar,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
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
