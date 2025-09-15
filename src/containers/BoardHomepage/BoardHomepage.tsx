import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { debounce } from 'lodash';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { IMeme } from 'src/constants/type';
import {
	getMemes,
	getRecommendMemes,
	IRecommendationParams,
} from 'src/service/meme';
import { t } from 'i18next';

const initialParams: IRecommendationParams = {
	limit: 50,
};

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IMeme[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [params, setParams] = useState<IRecommendationParams>(initialParams);

	const debouncedFetchMemes = debounce(
		async (currentParams: IRecommendationParams) => {
			setIsLoading(true);
			try {
				const res = await getRecommendMemes(currentParams);
				if (res?.data) {
					if (currentParams.cursor) {
						// Append to existing list when paginating
						setListImage((prev) => [...prev, ...(res.data.data ?? [])]);
					} else {
						// Replace list when starting fresh
						setListImage(res.data.data ?? []);
					}
					setHasNext(res.data.pagination.hasNext);
					setNextCursor(res.data.pagination.nextCursor);
				}
			} catch (error) {
				console.error('Failed to fetch recommendations:', error);
				// On error, disable further pagination
				setHasNext(false);
			}
			setIsLoading(false);
		},
		300
	);

	const fetchMemes = useCallback(
		(useCursor = false) => {
			const fetchParams: IRecommendationParams = {
				...params,
				...(useCursor && nextCursor ? { cursor: nextCursor } : {}),
			};
			debouncedFetchMemes(fetchParams);
		},
		[params, nextCursor, debouncedFetchMemes]
	);

	const fetchSearchMemes = async () => {
		setIsLoading(true);
		if (!searchValue) return;
		const res = await getMemes({ search: searchValue });
		setListImage(() => [...(res?.data?.data ?? [])]);
		setIsLoading(false);
	};

	useEffect(() => {
		if (searchValue) {
			fetchSearchMemes();
		} else {
			// Reset state and fetch fresh recommendations
			setParams(initialParams);
			setNextCursor(null);
			setHasNext(true);
			setListImage([]);
			fetchMemes(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		if (!hasNext || searchValue) return;
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight - 250 &&
				!isLoading &&
				hasNext
			) {
				fetchMemes(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading, hasNext, searchValue, fetchMemes]);

	return (
		<>
			<OBoard imageArray={listImage} />
			{isLoading && (
				<div className="my-4 flex justify-center">
					<ALoading isLoading={isLoading} />
				</div>
			)}
			{!hasNext && listImage.length > 0 && (
				<div className="my-4 flex justify-center">
					<p className="text-sm text-gray-500">
						{searchValue
							? t('BoardHomePage.create.isEnd')
							: t('BoardHomePage.isEnd')}
					</p>
				</div>
			)}
		</>
	);
};
