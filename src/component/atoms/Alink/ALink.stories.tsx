import type { Meta, StoryObj } from '@storybook/react';

import Alink from './ALink';

const meta = {
	component: Alink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Alink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
