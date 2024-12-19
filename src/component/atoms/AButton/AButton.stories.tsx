import type { Meta, StoryObj } from '@storybook/react';
import AButton from './AButton';

const meta = {
	component: AButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
