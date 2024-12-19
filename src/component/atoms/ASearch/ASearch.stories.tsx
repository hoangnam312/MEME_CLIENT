import type { Meta, StoryObj } from '@storybook/react';

import Asearch from './ASearch';

const meta = {
	component: Asearch,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Asearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
