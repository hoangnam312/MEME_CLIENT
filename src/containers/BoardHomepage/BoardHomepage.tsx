import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { debounce } from 'lodash';
import AButton from 'src/component/atoms/AButton/AButton';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { OInfiniteScroll } from 'src/component/organisms/OInfiniteScroll/OInfiniteScroll';
import { IMeme } from 'src/constants/type';
import {
	getMemeById,
	getRecommendationFeed,
	IRecommendationFeedParams,
	vectorSearchMemes,
} from 'src/service/meme';

const initialParams: IRecommendationFeedParams = {
	limit: 50,
};

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IMeme[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const viewMemeId = searchParams.get('view');
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [params, setParams] =
		useState<IRecommendationFeedParams>(initialParams);
	const [searchCursor, setSearchCursor] = useState<{
		lastId?: string;
		lastScore?: number;
	}>({});
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
						hasLiked: meme.hasLiked,
						hasDisliked: meme.hasDisliked,
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

	const fetchSearchMemes = useCallback(
		async (isInitial = true) => {
			setIsLoading(true);
			setError(null);
			if (!searchValue) return;
			try {
				const res = await vectorSearchMemes({
					q: searchValue,
					limit: 50,
					...(isInitial ? {} : searchCursor),
				});
				if (res?.data) {
					const memes = res.data.data.map((meme) => ({
						...meme,
						imageMedium: meme.image.imageMedium,
						imageSmall: meme.image.imageSmall,
						imageOrigin: meme.image.imageOrigin,
						viewCount: meme.stats.viewCount,
						likeCount: meme.stats.likeCount,
						copyCount: meme.stats.copyCount,
						dislikeCount: meme.stats.dislikeCount,
						hasLiked: meme.hasLiked,
						hasDisliked: meme.hasDisliked,
					})) as IMeme[];

					if (isInitial) {
						setListImage(memes);
					} else {
						setListImage((prev) => [...prev, ...memes]);
					}

					setHasNext(res.data.hasNext);
					if (res.data.nextCursor) {
						setSearchCursor({
							lastId: res.data.nextCursor.lastId,
							lastScore: res.data.nextCursor.lastScore,
						});
					}
				}
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('Failed to search memes')
				);
				setHasNext(false);
			}
			setIsLoading(false);
		},
		[searchValue, searchCursor]
	);

	const loadMoreSearchResults = useCallback(() => {
		if (searchValue && hasNext && !isLoading) {
			fetchSearchMemes(false);
		}
	}, [searchValue, hasNext, isLoading, fetchSearchMemes]);

	const handleRetry = () => {
		setError(null);
		setListImage([]);
		setHasNext(true);
		setSearchCursor({});
		if (searchValue) {
			fetchSearchMemes(true);
		} else {
			setParams(initialParams);
			fetchMemes();
		}
	};

	const handleExitSearch = () => {
		setSearchParams({});
	};

	// Fetch specific meme by ID when view parameter is present
	const fetchMemeById = async (memeId: string) => {
		try {
			const res = await getMemeById(memeId);
			if (res?.data) {
				// Check if meme already exists in list
				const memeExists = listImage.some((meme) => meme._id === memeId);
				if (!memeExists) {
					// Add to beginning of list if not already there
					setListImage((prev) => [res.data, ...prev]);
				}
			}
		} catch (err) {
			console.error('Failed to fetch meme by ID:', err);
		}
	};

	useEffect(() => {
		if (searchValue) {
			setSearchCursor({});
			setListImage([]);
			fetchSearchMemes(true);
		} else {
			setParams(initialParams);
			setHasNext(true);
			setListImage([]);
			fetchMemes();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	// Fetch specific meme when view parameter changes
	useEffect(() => {
		if (viewMemeId && !searchValue) {
			fetchMemeById(viewMemeId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewMemeId]);

	return (
		<div className="relative">
			{searchValue && (
				<div className="fixed left-5 top-20 z-[1000]">
					<AButton onClick={handleExitSearch} addClass="text-sm">
						<FontAwesomeIcon icon={faArrowLeft} />
						<span className="ml-2">{t('getBack')}</span>
					</AButton>
				</div>
			)}
			<OInfiniteScroll
				state={{
					isLoading,
					hasNext,
					isEmpty: listImage.length === 0,
					error,
				}}
				callbacks={{
					onLoadMore: searchValue ? loadMoreSearchResults : fetchMemes,
					onRetry: handleRetry,
				}}
			>
				<OBoard imageArray={listImage} />
			</OInfiniteScroll>
		</div>
	);
};
