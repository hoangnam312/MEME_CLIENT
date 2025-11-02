import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useBoundStore } from 'src/store/store';
import OModalRequiredAuthen from 'src/component/organisms/OModalRequiredAuthen/OModalRequiredAuthen';
import { MemeHeader, FrequentMemesTab, UploadedMemesTab } from './components';

const MyMeme = () => {
	const authen = useBoundStore((state) => state.authen);
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState(() => {
		return searchParams.get('tab') || 'frequent';
	});

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setSearchParams({ tab });
	};

	return (
		<OModalRequiredAuthen>
			<MemeHeader
				activeTab={activeTab}
				onTabChange={handleTabChange}
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
