import { useEffect, memo } from 'react';
import { useFrequentMemes } from '../hooks';
import { OInfiniteScroll } from 'src/component/organisms/OInfiniteScroll/OInfiniteScroll';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';

interface FrequentMemesTabProps {
	userId: string;
}

export const FrequentMemesTab = memo(({ userId }: FrequentMemesTabProps) => {
	const { memes, isLoading, hasNext, error, fetchMemes } =
		useFrequentMemes(userId);

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

FrequentMemesTab.displayName = 'FrequentMemesTab';
