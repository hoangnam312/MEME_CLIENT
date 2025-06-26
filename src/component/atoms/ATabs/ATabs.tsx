import React from 'react';

export interface TabItem {
	label: string;
	key: string;
	icon?: React.ReactNode;
	isDisabled?: boolean;
}

interface ATabsProps {
	tabs: TabItem[];
	value: string;
	onChange: (val: string) => void;
	addClass?: string;
}

const ATabs: React.FC<ATabsProps> = ({
	tabs,
	value,
	onChange,
	addClass = '',
}) => {
	return (
		<div className={`w-full border-b border-emerald-300 ${addClass}`}>
			<ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
				{tabs.map((tab) => {
					const isActive = value === tab.key;
					const isDisabled = tab.isDisabled;
					return (
						<li className="me-2" key={tab.key}>
							<button
								type="button"
								className={
									`group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 ` +
									(isActive
										? 'active border-violet-900 font-semibold text-violet-900 dark:border-violet-800 dark:text-violet-800 '
										: 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ') +
									(isDisabled
										? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
										: '')
								}
								onClick={() => !isDisabled && onChange(tab.key)}
								disabled={isDisabled}
								aria-current={isActive ? 'page' : undefined}
							>
								{tab.icon && <span className="me-2">{tab.icon}</span>}
								{tab.label}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ATabs;
