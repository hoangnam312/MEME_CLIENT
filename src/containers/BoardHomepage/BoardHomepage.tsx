import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { debounce } from 'lodash';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { IImage, IParamsGetListCursor } from 'src/constants/type';
import { getMemes, getRecommendMemes } from 'src/service/meme';

const initialParamsList: IParamsGetListCursor = {
	limit: 50,
};

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const [isLoading, setIsLoading] = useState(false);
	const [paramsList, setParamsList] =
		useState<IParamsGetListCursor>(initialParamsList);

	const debouncedFetchMemes = debounce(
		async (currentParamsList: IParamsGetListCursor) => {
			setIsLoading(true);
			const res = await getRecommendMemes(currentParamsList);
			if (res?.data) {
				setListImage((prev) => [...prev, ...(res?.data?.data ?? [])]);
				setParamsList((prev) => ({
					...prev,
					lastScore: res?.data?.lastScore,
					lastId: res?.data?.lastId,
				}));
			}
			setIsLoading(false);
		},
		300
	);

	const fetchMemes = useCallback(() => {
		debouncedFetchMemes(paramsList);
	}, [paramsList, debouncedFetchMemes]);

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
			setParamsList(initialParamsList);
			fetchMemes();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight - 250 &&
				!isLoading
			) {
				setIsLoading(true);
				fetchMemes();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading, fetchMemes]);

	return (
		<>
			<OBoard imageArray={listImage} />
			{isLoading && (
				<div className="my-4 flex justify-center">
					<ALoading isLoading={isLoading} />
				</div>
			)}
		</>
	);
};
