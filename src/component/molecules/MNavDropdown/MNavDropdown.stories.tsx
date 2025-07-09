import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router';
import MNavDropdown from './MNavDropdown';

const meta = {
	component: MNavDropdown,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<BrowserRouter>
				<div className="p-4">
					<Story />
				</div>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof MNavDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const LoggedInUser: Story = {
	args: {},
	decorators: [
		(Story) => {
			// Mock logged in state
			return (
				<BrowserRouter>
					<div className="p-4">
						<Story />
					</div>
				</BrowserRouter>
			);
		},
	],
};

export const GuestUser: Story = {
	args: {},
	decorators: [
		(Story) => {
			// Mock logged out state
			return (
				<BrowserRouter>
					<div className="p-4">
						<Story />
					</div>
				</BrowserRouter>
			);
		},
	],
};
