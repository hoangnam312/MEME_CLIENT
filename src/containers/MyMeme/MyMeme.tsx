import { useEffect, useState } from 'react';
import { t } from 'i18next';

import { useSearchParams } from 'react-router';

import { IImage } from 'src/constants/type';
import { getMemes } from 'src/service/meme';
import { useBoundStore } from 'src/store/store';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import ATabs from 'src/component/atoms/ATabs/ATabs';

function MyMeme() {
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get('search');
	const authen = useBoundStore((state) => state.authen);

	const [activeTab, setActiveTab] = useState('frequent');

	const tabs = [
		{ key: 'frequent', label: t('tab.frequent') },
		{ key: 'uploadedByMe', label: t('tab.uploadedByMe') },
		{ key: 'album', label: t('tab.album') },
	];

	useEffect(() => {
		if (!authen.userId) return;
		getMemes({ search: searchValue ?? undefined, userId: authen.userId }).then(
			(res) => setListImage(res.data.data)
		);
	}, [searchValue, authen]);

	return (
		<OModalRequiredAuthen>
			<ATabs
				addClass="mb-4 !w-1/2"
				tabs={tabs}
				value={activeTab}
				onChange={setActiveTab}
			/>
			<OBoard imageArray={listImage} />
		</OModalRequiredAuthen>
	);
}

export default MyMeme;
