import { useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router';
import { t } from 'i18next';
import { useBoundStore } from 'src/store/store';
import {
	MemeHeader,
	FrequentMemesTab,
	UploadedMemesTab,
} from '../MyMeme/components';
import useUserProfile from './hooks/useUserProfile';
import useFollowUser from './hooks/useFollowUser';

const UserProfile = () => {
	const { userId } = useParams<{ userId: string }>();
	const authen = useBoundStore((state) => state.authen);
	const isAuthenticated = !!authen.token;
	const isOwnProfile = !!authen.userId && authen.userId === userId;

	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState(
		() => searchParams.get('tab') || 'uploaded'
	);

	const { user, isLoading, error } = useUserProfile(userId ?? '');

	const followEnabled = isAuthenticated && !isOwnProfile && !!user;
	useFollowUser(userId ?? '', user?.username ?? '', followEnabled);

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		setSearchParams({ tab });
	};

	const tabs = [
		{ key: 'uploaded', label: t('tab.uploaded') },
		{ key: 'frequent', label: t('tab.frequent') },
	];

	if (!isLoading && (error || !user)) {
		return <div className="p-8 text-center">{t('user.error.notExist')}</div>;
	}

	return (
		<>
			{user && (
				<MemeHeader
					tabs={tabs}
					activeTab={activeTab}
					onTabChange={handleTabChange}
					user={{
						id: user._id,
						avatarUrl: user.profile?.avatar || '',
						username: user.username,
						displayName: user.profile?.displayName || user.username,
						followCount: user.stats.followersCount,
						followingCount: user.stats.followingCount,
						bio: user.profile?.bio,
					}}
					showSortDropdown={activeTab === 'uploaded'}
				/>
			)}
			{activeTab === 'uploaded' && <UploadedMemesTab userId={userId ?? ''} />}
			{activeTab === 'frequent' && <FrequentMemesTab userId={userId ?? ''} />}
		</>
	);
};

export default UserProfile;
