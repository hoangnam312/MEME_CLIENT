import { useState } from 'react';
import { IMeme } from 'src/constants/type';
import { getUserMemes, IGetUserMemesParams } from 'src/service/meme';

interface UseUserMemesProps {
	userId: string;
	sortBy: 'createdAt' | 'viewCount' | 'likeCount' | 'copyCount';
	sortOrder: 'asc' | 'desc';
	search?: string;
}

interface UseUserMemesReturn {
	memes: IMeme[];
	isLoading: boolean;
	hasNext: boolean;
	error: Error | null;
	fetchMemes: (loadMore?: boolean) => Promise<void>;
}

export const useUserMemes = ({
	userId,
	sortBy,
	sortOrder,
	search,
}: UseUserMemesProps): UseUserMemesReturn => {
	const [memes, setMemes] = useState<IMeme[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [nextCursor, setNextCursor] = useState<{
		lastId?: string;
		lastCreatedAt?: string;
	} | null>(null);

	const fetchMemes = async (loadMore = false) => {
		if (!userId) return;

		setIsLoading(true);
		setError(null);

		try {
			const hasCursorData = nextCursor?.lastId && nextCursor?.lastCreatedAt;
			const shouldUseCursor = loadMore && hasCursorData;

			const params: IGetUserMemesParams = {
				limit: 50,
				sortBy,
				sortOrder,
				search,
				...(shouldUseCursor && {
					lastId: nextCursor.lastId,
					lastCreatedAt: nextCursor.lastCreatedAt,
				}),
			};

			const res = await getUserMemes(userId, params);
			const newMemes = res.data.data;

			setMemes((prev) => (loadMore ? [...prev, ...newMemes] : newMemes));
			setHasNext(res.data.hasNext);
			setNextCursor(res.data.nextCursor || null);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Failed to fetch memes'));
			setHasNext(false);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		memes,
		isLoading,
		hasNext,
		error,
		fetchMemes,
	};
};
