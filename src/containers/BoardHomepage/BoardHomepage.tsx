import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { IImage } from 'src/constants/type';
import { getMemes, getRecommendMemes } from 'src/service/meme';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');

	useEffect(() => {
		if (!searchValue) {
			getRecommendMemes().then((res) => {
				return setListImage(res?.data?.data ?? []);
			});
			return;
		}
		getMemes(searchValue ? { search: searchValue } : undefined).then((res) =>
			setListImage(res?.data?.data ?? [])
		);
	}, [searchValue]);

	return <OBoard imageArray={listImage} />;
};
