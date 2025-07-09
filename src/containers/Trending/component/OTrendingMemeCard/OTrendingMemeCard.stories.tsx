import type { Meta, StoryObj } from '@storybook/react';
import OTrendingMemeCard from './OTrendingMemeCard';
import { ITrendingMeme } from 'src/constants/type';

const meta = {
	component: OTrendingMemeCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		data: {
			description: 'Trending meme data object',
		},
		onClick: {
			action: 'clicked',
			description: 'Click handler for the card',
		},
		addClass: {
			control: { type: 'text' },
			description: 'Additional CSS classes',
		},
		variant: {
			control: { type: 'select' },
			options: ['vertical', 'horizontal'],
			description: 'Card layout variant',
		},
	},
} satisfies Meta<typeof OTrendingMemeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTrendingMeme: ITrendingMeme = {
	_id: '1',
	name: 'Epic Cat Meme',
	description: 'A hilarious cat doing something funny',
	tag: 'cat,funny,viral',
	userId: 'user1',
	location: 'https://example.com/cat-meme.jpg',
	__v: 0,
	imageMedium: 'https://picsum.photos/800/1200?random=1',
	imageSmall: 'https://picsum.photos/400/600?random=1',
	viewCount: 1500,
	likeCount: 1200,
	copyCount: 450,
	rank: 1,
	analytics: {
		likesGained: 300,
		copiesGained: 120,
		viewsGained: 800,
		totalLikes: 1200,
		totalCopies: 450,
		totalViews: 1500,
		trendingScore: 95.5,
		timeFrame: '24h',
	},
	uploader: {
		_id: 'uploader1',
		username: 'MemeKing2024',
		avatarUrl: 'https://picsum.photos/100/100?random=100',
		verified: true,
		followCount: 5280,
		followingCount: 234,
	},
};

const sampleTrendingMeme2: ITrendingMeme = {
	...sampleTrendingMeme,
	_id: '2',
	name: 'Dancing Dog',
	rank: 2,
	analytics: {
		...sampleTrendingMeme.analytics,
		likesGained: 180,
		copiesGained: 95,
		viewsGained: 520,
		totalLikes: 850,
		totalCopies: 320,
		totalViews: 1100,
		trendingScore: 87.3,
	},
	uploader: {
		_id: 'uploader2',
		username: 'DoggoMaster',
		avatarUrl: 'https://picsum.photos/100/100?random=101',
		verified: false,
		followCount: 1200,
		followingCount: 150,
	},
};

const sampleTrendingMeme10: ITrendingMeme = {
	...sampleTrendingMeme,
	_id: '10',
	name: 'Random Meme',
	rank: 10,
	analytics: {
		...sampleTrendingMeme.analytics,
		likesGained: 25,
		copiesGained: 8,
		viewsGained: 85,
		totalLikes: 250,
		totalCopies: 80,
		totalViews: 450,
		trendingScore: 45.2,
	},
	uploader: {
		_id: 'uploader10',
		username: 'CasualMemer',
		avatarUrl: 'https://picsum.photos/100/100?random=110',
		verified: false,
		followCount: 150,
		followingCount: 75,
	},
};

export const TopRanked: Story = {
	args: {
		data: sampleTrendingMeme,
	},
};

export const SecondPlace: Story = {
	args: {
		data: sampleTrendingMeme2,
	},
};

export const LowerRanking: Story = {
	args: {
		data: sampleTrendingMeme10,
	},
};

export const WithoutName: Story = {
	args: {
		data: {
			...sampleTrendingMeme,
			name: undefined,
		},
	},
};

export const Default: Story = {
	args: {
		data: sampleTrendingMeme,
		variant: 'vertical',
	},
};

export const VerticalLayout: Story = {
	args: {
		data: sampleTrendingMeme,
		variant: 'vertical',
	},
};

export const HorizontalLayout: Story = {
	args: {
		data: { ...sampleTrendingMeme, rank: 5 },
		variant: 'horizontal',
	},
};
