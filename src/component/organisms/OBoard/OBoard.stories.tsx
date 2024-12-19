import type { Meta, StoryObj } from '@storybook/react';

import { OBoard } from './OBoard';

const meta = {
	component: OBoard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof OBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		imageArray: [],
	},
};
