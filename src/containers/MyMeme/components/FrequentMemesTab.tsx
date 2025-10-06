import { useEffect, memo } from 'react';
import { useFrequentMemes, useInfiniteScroll } from '../hooks';
import { MemeList } from './MemeList';

interface FrequentMemesTabProps {
	userId: string;
}

export const FrequentMemesTab = memo(({ userId }: FrequentMemesTabProps) => {
	const { memes, isLoading, hasNext, fetchMemes } = useFrequentMemes(userId);

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

FrequentMemesTab.displayName = 'FrequentMemesTab';
