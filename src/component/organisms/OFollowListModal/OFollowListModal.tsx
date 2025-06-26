import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import AModal from 'src/component/atoms/AModal/AModal';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { UserCardData } from 'src/hooks/useUserCard';

export interface OFollowListModalProps {
	isOpen: boolean;
	onClose: () => void;
	followers: UserCardData[];
	following: UserCardData[];
	defaultTab?: 'followers' | 'following';
}

const OFollowListModal: React.FC<OFollowListModalProps> = ({
	isOpen,
	onClose,
	followers,
	following,
	defaultTab = 'followers',
}) => {
	const [activeTab, setActiveTab] = useState(defaultTab);

	const tabs = [
		{ key: 'followers', label: t('followers') },
		{ key: 'following', label: t('following') },
	];

	useEffect(() => {
		setActiveTab(defaultTab);
	}, [defaultTab]);

	const currentUserList = activeTab === 'followers' ? followers : following;

	const handleTabChange = (val: string) => {
		setActiveTab(val as 'followers' | 'following');
	};

	return (
		<AModal isOpen={isOpen} closeModal={onClose} addClassWrap="!w-1/2">
			<div className="mb-4">
				<h2 className="mb-4 text-2xl font-bold text-indigo-800 dark:text-white">
					{activeTab === 'followers' ? t('followers') : t('following')}
				</h2>

				<ATabs
					tabs={tabs}
					value={activeTab}
					onChange={handleTabChange}
					addClass="w-full"
				/>
			</div>

			<div className="mb-4 max-h-96 overflow-y-auto">
				{currentUserList.length > 0 ? (
					<div className="space-y-3">
						{currentUserList.map((user, index) => (
							<MUserCard
								key={`${user.username}-${index}`}
								variant="compact"
								user={user}
								addClass="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
							/>
						))}
					</div>
				) : (
					<div className="py-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							{activeTab === 'followers'
								? t('noFollowersYet')
								: t('notFollowingAnyone')}
						</p>
					</div>
				)}
			</div>
		</AModal>
	);
};

export default OFollowListModal;
