import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import OModalRequiredAuthen from './OModalRequiredAuthen';

const meta = {
	component: OModalRequiredAuthen,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof OModalRequiredAuthen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<div className="border-1 flex h-80 w-1/2 items-center justify-center border">
				something behind
			</div>
		),
	},
};
