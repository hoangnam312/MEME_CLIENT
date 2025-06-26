import { useEffect, useState } from 'react';
import { t } from 'i18next';

import { useSearchParams } from 'react-router';

import { IImage } from 'src/constants/type';
import { getMemes } from 'src/service/meme';
import { useBoundStore } from 'src/store/store';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';

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

	// TODO: get user data from api
	const userData = {
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Jese Leos',
		followCount: 5,
		followingCount: 5,
	};

	useEffect(() => {
		if (!authen.userId) return;
		getMemes({ search: searchValue ?? undefined, userId: authen.userId }).then(
			(res) => setListImage(res.data.data)
		);
	}, [searchValue, authen]);

	return (
		<OModalRequiredAuthen>
			<div className="mb-6 flex justify-between ">
				<ATabs
					addClass="!w-1/2"
					tabs={tabs}
					value={activeTab}
					onChange={setActiveTab}
				/>
				{/* TODO: show only if user view another user */}
				<MUserCard variant="compact" user={userData} />
			</div>

			<OBoard imageArray={listImage} />
		</OModalRequiredAuthen>
	);
}

export default MyMeme;
