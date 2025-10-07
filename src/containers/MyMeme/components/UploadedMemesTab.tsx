import { useEffect, memo } from 'react';
import { useUserMemes } from '../hooks';
import { OInfiniteScroll } from 'src/component/organisms/OInfiniteScroll/OInfiniteScroll';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import type { SortOption, SortOrder } from './SortDropdown';

interface UploadedMemesTabProps {
	userId: string;
}

export const UploadedMemesTab = memo(({ userId }: UploadedMemesTabProps) => {
	const { memes, isLoading, hasNext, error, fetchMemes } = useUserMemes({
		userId,
		sortBy: 'createdAt',
		sortOrder: 'desc',
	});

	useEffect(() => {
		if (!userId) return;
		fetchMemes(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<OInfiniteScroll
			state={{
				isLoading,
				hasNext,
				isEmpty: memes.length === 0,
				error,
			}}
			callbacks={{
				onLoadMore: () => fetchMemes(true),
				onRetry: () => fetchMemes(false),
			}}
		>
			<OBoard imageArray={memes} />
		</OInfiniteScroll>
	);
});

UploadedMemesTab.displayName = 'UploadedMemesTab';

export type { SortOption, SortOrder };
