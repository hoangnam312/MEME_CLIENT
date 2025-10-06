import { useEffect } from 'react';

interface UseInfiniteScrollProps {
	isLoading: boolean;
	hasNext: boolean;
	onLoadMore: () => void;
	threshold?: number;
}

export const useInfiniteScroll = ({
	isLoading,
	hasNext,
	onLoadMore,
	threshold = 250,
}: UseInfiniteScrollProps): void => {
	useEffect(() => {
		if (!hasNext || isLoading) return;

		const handleScroll = () => {
			const { innerHeight } = window;
			const { scrollTop, offsetHeight } = document.documentElement;

			if (
				innerHeight + scrollTop >= offsetHeight - threshold &&
				!isLoading &&
				hasNext
			) {
				onLoadMore();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading, hasNext, onLoadMore, threshold]);
};
