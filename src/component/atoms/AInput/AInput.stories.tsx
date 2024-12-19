import type { Meta, StoryObj } from '@storybook/react';
import AInput from './AInput';

const meta = {
	component: AInput,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
