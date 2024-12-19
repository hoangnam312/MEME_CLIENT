import type { Meta, StoryObj } from '@storybook/react';

import MinputWithinForm from './MInputWithinForm';

const meta = {
	component: MinputWithinForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof MinputWithinForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
