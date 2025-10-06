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
	const [nextCursor, setNextCursor] = useState<{
		lastId?: string;
		lastCreatedAt?: string;
	} | null>(null);

	const fetchMemes = async (loadMore?: boolean) => {
		if (!userId) return;

		setIsLoading(true);
		try {
			const params: IGetUserMemesParams = {
				limit: 50,
				sortBy,
				sortOrder,
				search,
				...(loadMore && nextCursor?.lastId && nextCursor?.lastCreatedAt
					? {
						lastId: nextCursor.lastId,
						lastCreatedAt: nextCursor.lastCreatedAt,
					}
					: {}),
			};

			const res = await getUserMemes(userId, params);

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
	};

	return {
		memes,
		isLoading,
		hasNext,
		fetchMemes,
	};
};
