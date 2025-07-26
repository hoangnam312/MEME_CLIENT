import type { Meta, StoryObj } from '@storybook/react';
import OTrendingColumn from './OTrendingColumn';
import { ITrendingMeme } from 'src/constants/type';

const meta: Meta<typeof OTrendingColumn> = {
	title: 'Organisms/OTrendingColumn',
	component: OTrendingColumn,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Column component for displaying trending memes for a specific time period with header, loading states, and error handling.',
			},
		},
	},
	argTypes: {
		timeFrame: {
			control: { type: 'select' },
			options: ['24h', '1w', '1m'],
			description: 'Time frame for trending memes',
		},
		isLoading: {
			control: { type: 'boolean' },
			description: 'Loading state',
		},
		error: {
			control: { type: 'text' },
			description: 'Error message to display',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock trending memes data
const mockTrendingMemes: ITrendingMeme[] = Array.from(
	{ length: 6 },
	(_, index) => ({
		_id: `trending-${index + 1}`,
		name: `Trending Meme ${index + 1}`,
		description: `This is a trending meme description ${index + 1}`,
		tag: `trending meme${index + 1}`,
		userId: `user-${index + 1}`,
		location: `https://picsum.photos/400/600?random=${index + 1}`,
		__v: 0,
		imageMedium: `https://picsum.photos/800/1200?random=${index + 1}`,
		imageSmall: `https://picsum.photos/400/600?random=${index + 1}`,
		viewCount: Math.floor(Math.random() * 10000) + 1000,
		likeCount: Math.floor(Math.random() * 5000) + 500,
		copyCount: Math.floor(Math.random() * 2000) + 200,
		rank: index + 1,
		analytics: {
			likesGained: Math.floor(Math.random() * 1000) + 100,
			copiesGained: Math.floor(Math.random() * 500) + 50,
			viewsGained: Math.floor(Math.random() * 2000) + 200,
			totalLikes: Math.floor(Math.random() * 5000) + 500,
			totalCopies: Math.floor(Math.random() * 2000) + 200,
			totalViews: Math.floor(Math.random() * 10000) + 1000,
			trendingScore: Math.random() * 100,
			timeFrame: '24h',
		},
		uploader: {
			_id: `user-${index + 1}`,
			username: `TrendingUser${index + 1}`,
			displayName: `Trending User ${index + 1}`,
			avatarUrl: `https://picsum.photos/50/50?random=${index + 100}`,
			followCount: Math.floor(Math.random() * 1000) + 100,
			followingCount: Math.floor(Math.random() * 500) + 50,
		},
	})
);

export const Default: Story = {
	args: {
		timeFrame: '24h',
		memes: mockTrendingMemes,
		isLoading: false,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const Loading: Story = {
	args: {
		timeFrame: '24h',
		memes: [],
		isLoading: true,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const LoadingMore: Story = {
	args: {
		timeFrame: '1w',
		memes: mockTrendingMemes.slice(0, 3),
		isLoading: true,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const ErrorState: Story = {
	args: {
		timeFrame: '1m',
		memes: [],
		isLoading: false,
		error: 'Failed to load trending memes. Please try again.',
		onRetry: () => console.log('Retry clicked'),
	},
};

export const EmptyState: Story = {
	args: {
		timeFrame: '24h',
		memes: [],
		isLoading: false,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const WeeklyColumn: Story = {
	args: {
		timeFrame: '1w',
		memes: mockTrendingMemes.map((meme) => ({
			...meme,
			analytics: { ...meme.analytics, timeFrame: '1w' },
		})),
		isLoading: false,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const MonthlyColumn: Story = {
	args: {
		timeFrame: '1m',
		memes: mockTrendingMemes.map((meme) => ({
			...meme,
			analytics: { ...meme.analytics, timeFrame: '1m' },
		})),
		isLoading: false,
		error: null,
		onRetry: () => console.log('Retry clicked'),
	},
};

export const AllColumns: Story = {
	render: () => (
		<div className="grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
			<OTrendingColumn
				timeFrame="24h"
				memes={mockTrendingMemes.slice(0, 4)}
				isLoading={false}
				error={null}
				onRetry={() => console.log('24h retry')}
			/>
			<OTrendingColumn
				timeFrame="1w"
				memes={mockTrendingMemes.slice(1, 5)}
				isLoading={false}
				error={null}
				onRetry={() => console.log('1w retry')}
			/>
			<OTrendingColumn
				timeFrame="1m"
				memes={mockTrendingMemes.slice(2, 6)}
				isLoading={false}
				error={null}
				onRetry={() => console.log('1m retry')}
			/>
		</div>
	),
};
