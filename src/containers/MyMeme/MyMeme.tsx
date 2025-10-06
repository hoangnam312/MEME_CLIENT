import { useState } from 'react';
import { useBoundStore } from 'src/store/store';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import { MemeHeader, FrequentMemesTab, UploadedMemesTab } from './components';

const MyMeme = () => {
	const authen = useBoundStore((state) => state.authen);
	const [activeTab, setActiveTab] = useState('frequent');

	return (
		<OModalRequiredAuthen>
			<MemeHeader
				activeTab={activeTab}
				onTabChange={setActiveTab}
				user={{
					id: authen.userId,
					avatarUrl: authen.profile?.avatar || '',
					username: authen.username,
					displayName: authen.profile?.displayName || '',
					followCount: authen.stats.followersCount,
					followingCount: authen.stats.followingCount,
					bio: authen.profile?.bio,
				}}
				showSortDropdown={activeTab === 'uploadedByMe'}
			/>
			{activeTab === 'frequent' && <FrequentMemesTab userId={authen.userId} />}
			{activeTab === 'uploadedByMe' && (
				<UploadedMemesTab userId={authen.userId} />
			)}
		</OModalRequiredAuthen>
	);
};

export default MyMeme;
