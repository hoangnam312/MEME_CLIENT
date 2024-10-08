import { useEffect, useState } from 'react';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import { IImage } from 'src/constants/type';
import { getMemes } from 'src/service/meme';

export const BoardHomepage = () => {
	const [listImage, setListImage] = useState<IImage[]>([]);

	useEffect(() => {
		getMemes().then((res) => setListImage(res.data.data));
	}, []);

	return <OBoard imageArray={listImage} />;
};
