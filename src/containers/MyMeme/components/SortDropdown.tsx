import { useState } from 'react';
import { t } from 'i18next';
import ADropdown, { IOption } from 'src/component/atoms/ADropdown/ADropdown';
import { useOpen } from 'src/hooks/useOpen';

export type SortOption = 'createdAt' | 'viewCount' | 'likeCount' | 'copyCount';
export type SortOrder = 'asc' | 'desc';

interface SortDropdownProps {
	onSortChange: (sortBy: SortOption, sortOrder: SortOrder) => void;
}

export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
	const { isOpen, toggle, close } = useOpen();
	const [selectedSort, setSelectedSort] = useState<string>('createdAt-desc');

	const sortOptions: IOption[] = [
		{ label: t('sort.newest'), value: 'createdAt-desc' },
		{ label: t('sort.oldest'), value: 'createdAt-asc' },
		{ label: t('sort.mostViewed'), value: 'viewCount-desc' },
		{ label: t('sort.mostLiked'), value: 'likeCount-desc' },
		{ label: t('sort.mostCopied'), value: 'copyCount-desc' },
	];

	const handleSelect = (value: string) => {
		const [field, order] = value.split('-') as [SortOption, SortOrder];
		setSelectedSort(value);
		onSortChange(field, order);
		close();
	};

	const currentLabel =
		sortOptions.find((opt) => opt.value === selectedSort)?.label ||
		t('sort.label');

	return (
		<div className="relative">
			<ADropdown
				isOpen={isOpen}
				options={sortOptions}
				onSelect={handleSelect}
				buttonOutside={
					<button
						onClick={toggle}
						className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
							/>
						</svg>
						{currentLabel}
					</button>
				}
			/>
		</div>
	);
};
