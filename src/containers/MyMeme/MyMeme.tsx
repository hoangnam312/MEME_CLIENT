import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { IImage } from 'src/constants/type';
import { getMemes } from 'src/service/meme';
import { useBoundStore } from 'src/store/store';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';

function MyMeme() {
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const authen = useBoundStore((state) => state.authen);

	useEffect(() => {
		if (!authen.userId) return;
		getMemes({ search: searchValue ?? undefined, userId: authen.userId }).then(
			(res) => setListImage(res.data.data)
		);
	}, [searchValue, authen]);

	return (
		<OModalRequiredAuthen>
			<OBoard imageArray={listImage} />
		</OModalRequiredAuthen>
	);
}

export default MyMeme;
