import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { debounce } from 'lodash';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { OInfiniteScroll } from 'src/component/organisms/OInfiniteScroll/OInfiniteScroll';
import { IMeme } from 'src/constants/type';
import {
	getMemes,
	getRecommendationFeed,
	IRecommendationFeedParams,
} from 'src/service/meme';

const initialParams: IRecommendationFeedParams = {
	limit: 50,
};

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IMeme[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [params, setParams] =
		useState<IRecommendationFeedParams>(initialParams);

	const debouncedFetchMemes = debounce(
		async (currentParams: IRecommendationFeedParams) => {
			setIsLoading(true);
			setError(null);
			try {
				const res = await getRecommendationFeed(currentParams);
				if (res?.data?.success) {
					const memes = res.data.data.recommendations.map((meme) => ({
						...meme,
						imageMedium: meme.image.imageMedium,
						imageSmall: meme.image.imageSmall,
						imageOrigin: meme.image.imageOrigin,
						viewCount: meme.stats.viewCount,
						likeCount: meme.stats.likeCount,
						copyCount: meme.stats.copyCount,
						dislikeCount: meme.stats.dislikeCount,
					})) as IMeme[];
					setListImage((prev) => [...prev, ...memes]);
					setHasNext(res.data.data.hasMore);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('Failed to fetch memes')
				);
				setHasNext(false);
			}
			setIsLoading(false);
		},
		300
	);

	const fetchMemes = useCallback(() => {
		debouncedFetchMemes(params);
	}, [params, debouncedFetchMemes]);

	const fetchSearchMemes = async () => {
		setIsLoading(true);
		setError(null);
		if (!searchValue) return;
		try {
			const res = await getMemes({ search: searchValue });
			setListImage(() => [...(res?.data?.data ?? [])]);
		} catch (err) {
			setError(
				err instanceof Error ? err : new Error('Failed to search memes')
			);
		}
		setIsLoading(false);
	};

	const handleRetry = () => {
		setError(null);
		setListImage([]);
		setHasNext(true);
		if (searchValue) {
			fetchSearchMemes();
		} else {
			setParams(initialParams);
			fetchMemes();
		}
	};

	useEffect(() => {
		if (searchValue) {
			fetchSearchMemes();
		} else {
			setParams(initialParams);
			setHasNext(true);
			setListImage([]);
			fetchMemes();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<OInfiniteScroll
			state={{
				isLoading,
				hasNext: searchValue ? false : hasNext,
				isEmpty: listImage.length === 0,
				error,
			}}
			callbacks={{
				onLoadMore: fetchMemes,
				onRetry: handleRetry,
			}}
		>
			<OBoard imageArray={listImage} />
		</OInfiniteScroll>
	);
};
