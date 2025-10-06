import { useEffect, memo } from 'react';
import { useUserMemes, useInfiniteScroll } from '../hooks';
import { MemeList } from './MemeList';
import type { SortOption, SortOrder } from './SortDropdown';

interface UploadedMemesTabProps {
	userId: string;
}

export const UploadedMemesTab = memo(({ userId }: UploadedMemesTabProps) => {
	const { memes, isLoading, hasNext, fetchMemes } = useUserMemes({
		userId,
		sortBy: 'createdAt',
		sortOrder: 'desc',
	});

	useInfiniteScroll({
		isLoading,
		hasNext,
		onLoadMore: () => fetchMemes(true),
	});

	useEffect(() => {
		if (!userId) return;
		fetchMemes(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <MemeList memes={memes} isLoading={isLoading} hasNext={hasNext} />;
});

UploadedMemesTab.displayName = 'UploadedMemesTab';

export type { SortOption, SortOrder };
