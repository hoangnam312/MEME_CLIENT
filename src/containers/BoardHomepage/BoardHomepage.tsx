import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { debounce } from 'lodash';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { IMeme } from 'src/constants/type';
import {
	getMemes,
	getRandomRecommendMemes,
	IRandomRecommendationParams,
} from 'src/service/meme';
import { t } from 'i18next';

const initialParams: IRandomRecommendationParams = {
	limit: 50,
	excludeViewed: false,
};

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IMeme[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [params, setParams] =
		useState<IRandomRecommendationParams>(initialParams);

	const debouncedFetchMemes = debounce(
		async (currentParams: IRandomRecommendationParams) => {
			setIsLoading(true);
			try {
				const res = await getRandomRecommendMemes(currentParams);
				if (res?.data?.success) {
					const memes = res.data.data.memes.map((meme) => ({
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
					setHasNext(memes.length === currentParams.limit);
				}
			} catch (error) {
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
		if (!searchValue) return;
		const res = await getMemes({ search: searchValue });
		setListImage(() => [...(res?.data?.data ?? [])]);
		setIsLoading(false);
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

	useEffect(() => {
		if (!hasNext || searchValue) return;
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight - 250 &&
				!isLoading &&
				hasNext
			) {
				fetchMemes();
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
