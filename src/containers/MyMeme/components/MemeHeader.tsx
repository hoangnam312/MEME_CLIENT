import { t } from 'i18next';
import ATabs from 'src/component/atoms/ATabs/ATabs';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { SortDropdown, SortOption, SortOrder } from './SortDropdown';

export interface Tab {
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
	tabs?: Tab[];
	onSortChange?: (sortBy: SortOption, sortOrder: SortOrder) => void;
	showSortDropdown?: boolean;
}

export const MemeHeader = ({
	activeTab,
	onTabChange,
	user,
	tabs,
	onSortChange,
	showSortDropdown = false,
}: MemeHeaderProps) => {
	const defaultTabs: Tab[] = [
		{ key: 'frequent', label: t('tab.frequent') },
		{ key: 'uploadedByMe', label: t('tab.uploadedByMe') },
		// disabled album
		// { key: 'album', label: t('tab.album') },
	];

	const resolvedTabs = tabs ?? defaultTabs;

	return (
		<div className="mb-3 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:gap-0">
			<ATabs
				addClass="!w-full md:!w-1/2"
				tabs={resolvedTabs}
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
