import { useState, useCallback } from 'react';
import {
	getRandomRecommendMemes,
	IRandomRecommendationParams,
	IRandomMemeItem,
} from 'src/service/meme';

interface UseRandomRecommendMemesReturn {
	memes: IRandomMemeItem[];
	isLoading: boolean;
	totalAvailable: number;
	fetchRandomMemes: (params?: IRandomRecommendationParams) => Promise<void>;
	refreshMemes: (params?: IRandomRecommendationParams) => Promise<void>;
}

export const useRandomRecommendMemes = (): UseRandomRecommendMemesReturn => {
	const [memes, setMemes] = useState<IRandomMemeItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [totalAvailable, setTotalAvailable] = useState(0);

	const fetchRandomMemes = useCallback(
		async (params?: IRandomRecommendationParams) => {
			setIsLoading(true);
			try {
				const res = await getRandomRecommendMemes(params);

				if (res.data.success) {
					setMemes(res.data.data.memes);
					setTotalAvailable(res.data.data.totalAvailable);
				}
			} catch (error) {
				setMemes([]);
				setTotalAvailable(0);
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	const refreshMemes = useCallback(
		async (params?: IRandomRecommendationParams) => {
			await fetchRandomMemes(params);
		},
		[fetchRandomMemes]
	);

	return {
		memes,
		isLoading,
		totalAvailable,
		fetchRandomMemes,
		refreshMemes,
	};
};
