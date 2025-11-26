import { t } from 'i18next';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { SortDropdown, SortOption, SortOrder } from './SortDropdown';

interface Tab {
	key: string;
	label: string;
}

interface UserData {
	id: string;
	avatarUrl: string;
	username: string;
	displayName: string;
	followCount: number;
	followingCount: number;
	bio?: string;
}

interface MemeHeaderProps {
	activeTab: string;
	onTabChange: (tab: string) => void;
	user: UserData;
	onSortChange?: (sortBy: SortOption, sortOrder: SortOrder) => void;
	showSortDropdown?: boolean;
}

export const MemeHeader = ({
	activeTab,
	onTabChange,
	user,
	onSortChange,
	showSortDropdown = false,
}: MemeHeaderProps) => {
	const tabs: Tab[] = [
		{ key: 'frequent', label: t('tab.frequent') },
		{ key: 'uploadedByMe', label: t('tab.uploadedByMe') },
		// disabled album
		// { key: 'album', label: t('tab.album') },
	];

	return (
		<div className="mb-3 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:gap-0">
			<ATabs
				addClass="!w-full md:!w-1/2"
				tabs={tabs}
				value={activeTab}
				onChange={onTabChange}
			/>
			<div className="flex items-center justify-between gap-2 md:justify-end md:gap-3">
				{showSortDropdown && onSortChange && (
					<SortDropdown onSortChange={onSortChange} />
				)}
				<MUserCard variant="compact" user={user} addClass="w-full md:w-auto" />
			</div>
		</div>
	);
};
