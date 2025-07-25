import type { Meta, StoryObj } from '@storybook/react';
import ACopyButton, { CopyData, TrackingCallback } from './ACopyButton';

const meta = {
	title: 'Atoms/ACopyButton',
	component: ACopyButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'minimal', 'outline'],
		},
		disabled: {
			control: { type: 'boolean' },
		},
		timeout: {
			control: { type: 'number' },
		},
	},
} satisfies Meta<typeof ACopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default tracking callback for stories
const defaultTracking: TrackingCallback<unknown> = {
	onSuccess: (data) => console.log('✅ Copy successful:', data),
	onFailure: (data, error) => console.error('❌ Copy failed:', data, error),
};

// Text Copy Stories
export const CopyText: Story = {
	args: {
		data: {
			value: 'Hello, this is some text to copy!',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

export const CopyTextSmall: Story = {
	args: {
		data: {
			value: 'Small copy button text',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'sm',
		variant: 'default',
	},
};

export const CopyTextLarge: Story = {
	args: {
		data: {
			value: 'Large copy button text',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'lg',
		variant: 'default',
	},
};

// URL Copy Stories
export const CopyUrl: Story = {
	args: {
		data: {
			value: 'https://example.com/some-awesome-page',
			strategy: 'url',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

// Image Copy Stories
export const CopyImage: Story = {
	args: {
		data: {
			value: 'https://via.placeholder.com/300x200.png',
			strategy: 'image',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

// Object Property Copy Stories
const sampleUser = {
	id: 'user-123',
	username: 'johndoe',
	email: 'john@example.com',
	bio: 'Software developer passionate about React and TypeScript',
};

export const CopyObjectProperty: Story = {
	args: {
		data: {
			value: sampleUser,
			strategy: 'object',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

export const CopyObjectAsJson: Story = {
	args: {
		data: {
			value: sampleUser,
			strategy: 'object',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

// Image from Object Stories
const imageObject = {
	id: 'img-456',
	title: 'Cool Image',
	imageUrl: 'https://via.placeholder.com/400x300.png',
	thumbnailUrl: 'https://via.placeholder.com/100x75.png',
};

export const CopyImageFromObject: Story = {
	args: {
		data: {
			value: imageObject,
			strategy: 'image',
			// imageUrlPath is not allowed for CopyData<unknown> in this Storybook context
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
};

// Variant Stories
export const MinimalVariant: Story = {
	args: {
		data: {
			value: 'Minimal variant text',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'minimal',
	},
};

export const OutlineVariant: Story = {
	args: {
		data: {
			value: 'Outline variant text',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'outline',
	},
};

// State Stories
export const DisabledState: Story = {
	args: {
		data: {
			value: 'This button is disabled',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
		disabled: true,
	},
};

export const CustomTimeout: Story = {
	args: {
		data: {
			value: 'Custom 5-second timeout',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
		timeout: 5000,
	},
};

// Custom Styling Story
export const CustomStyling: Story = {
	args: {
		data: {
			value: 'Custom styled button',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
		className: '!bg-purple-500 hover:!bg-purple-600 !text-white',
	},
};

// Advanced Tracking Story
const advancedTracking: TrackingCallback<unknown> = {
	onSuccess: async (data) => {
		console.log('🎉 Advanced tracking - Copy successful!', {
			content: data,
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
		});
		// Simulate analytics call
		await new Promise((resolve) => setTimeout(resolve, 100));
	},
	onFailure: async (data, error) => {
		console.error('💥 Advanced tracking - Copy failed!', {
			content: data,
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString(),
		});
		// Simulate error reporting
		await new Promise((resolve) => setTimeout(resolve, 100));
	},
};

export const AdvancedTracking: Story = {
	args: {
		data: {
			value: 'Text with advanced tracking (check console)',
			strategy: 'text',
		} as CopyData<unknown>,
		tracking: advancedTracking,
		size: 'md',
		variant: 'default',
	},
};

// Multiple Buttons Demo
export const MultipleButtons: Story = {
	args: {
		data: { value: 'Default', strategy: 'text' },
		tracking: defaultTracking,
		size: 'md',
		variant: 'default',
	},
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<ACopyButton
				data={{ value: 'Text', strategy: 'text' }}
				tracking={defaultTracking}
				size="sm"
				variant="minimal"
			/>
			<ACopyButton
				data={{ value: 'https://example.com', strategy: 'url' }}
				tracking={defaultTracking}
				size="md"
				variant="outline"
			/>
			<ACopyButton
				data={{
					value: sampleUser,
					strategy: 'object',
					objectProperty: 'username',
				}}
				tracking={defaultTracking}
				size="lg"
				variant="default"
			/>
		</div>
	),
};
