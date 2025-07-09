import React from 'react';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFire,
	faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { ITrendingUser, TrendingTimeFrame } from 'src/constants/type';
import OTrendingUserCard from '../OTrendingUserCard/OTrendingUserCard';
import AButton from 'src/component/atoms/AButton/AButton';

export interface OTrendingUsersColumnProps {
	timeFrame: TrendingTimeFrame;
	users: ITrendingUser[];
	isLoading: boolean;
	error: string | null;
	onRetry: () => void;
	addClass?: string;
}

const OTrendingUsersColumn: React.FC<OTrendingUsersColumnProps> = ({
	timeFrame,
	users,
	isLoading,
	error,
	onRetry,
	addClass = '',
}) => {
	const renderSkeletonCards = () => {
		return (
			<>
				{/* Skeleton for vertical cards (rank 1-3) */}
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={`skeleton-vertical-${index}`}
						className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
					>
						{/* Rank Badge */}
						<div className="absolute right-2 top-2 h-5 w-8 animate-pulse rounded bg-gray-200" />

						{/* Avatar */}
						<div className="mx-auto mb-3 h-16 w-16 animate-pulse rounded-xl bg-gray-200" />

						{/* Username */}
						<div className="mx-auto mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />

						{/* User Bio */}
						<div className="mx-auto mb-4 h-3 w-32 animate-pulse rounded bg-gray-200" />

						{/* Stats Grid */}
						<div className="mb-4 grid grid-cols-5 gap-1">
							{Array.from({ length: 5 }).map((_, statIndex) => (
								<div
									key={statIndex}
									className="flex flex-col items-center rounded bg-gray-50 p-1.5"
								>
									<div className="mb-1 h-2.5 w-2.5 animate-pulse rounded bg-gray-200" />
									<div className="h-3 w-6 animate-pulse rounded bg-gray-200" />
									<div className="mt-0.5 h-2 w-8 animate-pulse rounded bg-gray-200" />
								</div>
							))}
						</div>

						{/* Follow Button */}
						<div className="flex justify-center">
							<div className="h-8 w-20 animate-pulse rounded-md bg-gray-200" />
						</div>
					</div>
				))}

				{/* Skeleton for horizontal cards (rank 4+) */}
				{Array.from({ length: 7 }).map((_, index) => (
					<div
						key={`skeleton-horizontal-${index}`}
						className="relative flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
					>
						{/* Rank Badge */}
						<div className="absolute right-2 top-2 h-4 w-6 animate-pulse rounded bg-gray-200" />

						{/* Avatar */}
						<div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />

						{/* Content */}
						<div className="flex-1">
							{/* Username */}
							<div className="mb-1 h-4 w-20 animate-pulse rounded bg-gray-200" />

							{/* Stats */}
							<div className="flex justify-between gap-2">
								{Array.from({ length: 5 }).map((_, statIndex) => (
									<div key={statIndex} className="flex items-center gap-1">
										<div className="h-2.5 w-2.5 animate-pulse rounded bg-gray-200" />
										<div className="h-3 w-8 animate-pulse rounded bg-gray-200" />
									</div>
								))}
							</div>
						</div>

						{/* Follow Button */}
						<div className="h-7 w-16 animate-pulse rounded-md bg-gray-200" />
					</div>
				))}
			</>
		);
	};

	const renderContent = () => {
		if (isLoading && users.length === 0) {
			return <div className="space-y-4">{renderSkeletonCards()}</div>;
		}

		if (error && users.length === 0) {
			return (
				<div className="py-8 text-center">
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className="mb-3 text-4xl text-gray-500"
					/>
					<h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
						{error}
					</h4>
					<AButton onClick={onRetry} addClass="text-xs px-3 py-1">
						{t('trendingUsers.retry')}
					</AButton>
				</div>
			);
		}

		if (!isLoading && users.length === 0) {
			return (
				<div className="py-8 text-center">
					<FontAwesomeIcon
						icon={faFire}
						className="mb-3 text-4xl text-gray-500"
					/>
					<h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
						{t('trendingUsers.empty')}
					</h4>
					<p className="text-xs text-gray-600 dark:text-gray-300">
						{t('trendingUsers.emptyDesc')}
					</p>
				</div>
			);
		}

		return (
			<div className="space-y-2">
				{users.map((user) => (
					<OTrendingUserCard
						key={user._id}
						data={user}
						variant={user.rank <= 3 ? 'vertical' : 'horizontal'}
						addClass={user.rank <= 3 ? 'mb-1' : ''}
					/>
				))}
			</div>
		);
	};

	return (
		<div className={`rounded-xl bg-gray-50 p-3 ${addClass}`}>
			{/* Column Header */}
			<div className="mb-3 text-center">
				<h3 className="mb-1 text-base font-bold text-indigo-800 dark:text-white">
					{t(`trendingUsers.columns.${timeFrame}`)}
				</h3>
				<div className="mx-auto h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
			</div>

			{/* Column Content */}
			{renderContent()}
		</div>
	);
};

export default OTrendingUsersColumn;
