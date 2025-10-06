import { useState, useCallback } from 'react';
import { IMeme } from 'src/constants/type';
import {
	getUserFrequentMemes,
	IGetFrequentMemesParams,
} from 'src/service/meme';

interface UseFrequentMemesReturn {
	memes: IMeme[];
	isLoading: boolean;
	hasNext: boolean;
	fetchMemes: (loadMore?: boolean) => Promise<void>;
}

export const useFrequentMemes = (userId: string): UseFrequentMemesReturn => {
	const [memes, setMemes] = useState<IMeme[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(false);
	const [nextCursor, setNextCursor] = useState<{
		lastPoint?: number;
		lastMemeId?: string;
	} | null>(null);

	const fetchMemes = useCallback(
		async (loadMore = false) => {
			if (!userId) return;

			setIsLoading(true);
			try {
				const params: IGetFrequentMemesParams = {
					limit: 50,
					...(loadMore && nextCursor?.lastPoint && nextCursor?.lastMemeId
						? {
							lastPoint: nextCursor.lastPoint,
							lastMemeId: nextCursor.lastMemeId,
						}
						: {}),
				};

				const res = await getUserFrequentMemes(userId, params);

				setMemes((prev) =>
					loadMore ? [...prev, ...res.data.data] : res.data.data
				);
				setHasNext(res.data.hasNext);
				setNextCursor(res.data.nextCursor || null);
			} catch (error) {
				setHasNext(false);
			} finally {
				setIsLoading(false);
			}
		},
		[userId, nextCursor]
	);

	return {
		memes,
		isLoading,
		hasNext,
		fetchMemes,
	};
};
