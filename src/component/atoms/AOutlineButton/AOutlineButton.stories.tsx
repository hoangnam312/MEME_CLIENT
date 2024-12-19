import type { Meta, StoryObj } from '@storybook/react';

import AOutlineButton from './AOutlineButton';

const meta = {
	component: AOutlineButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AOutlineButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
