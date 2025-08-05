import type { Meta, StoryObj } from '@storybook/react';
import ASquareOutlineButton from './ASquareOutlineButton';

const meta: Meta<typeof ASquareOutlineButton> = {
	title: 'Atoms/ASquareOutlineButton',
	component: ASquareOutlineButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		content: {
			control: 'text',
		},
		addClass: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
		onClick: {
			action: 'clicked',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		content: 'Click me',
	},
};

export const WithChildren: Story = {
	args: {
		children: <span>Custom Content</span>,
	},
};

export const Disabled: Story = {
	args: {
		content: 'Disabled Button',
		disabled: true,
	},
};

export const CustomClass: Story = {
	args: {
		content: 'Custom Style',
		addClass: 'bg-blue-100 hover:bg-blue-200',
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
						clipRule="evenodd"
					/>
				</svg>
				<span>Download</span>
			</>
		),
	},
};
