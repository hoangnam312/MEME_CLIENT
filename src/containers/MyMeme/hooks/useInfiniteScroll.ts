import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
	isLoading: boolean;
	hasNext: boolean;
	onLoadMore: () => void;
	threshold?: number;
	debounceMs?: number;
}

export const useInfiniteScroll = ({
	isLoading,
	hasNext,
	onLoadMore,
	threshold = 500,
	debounceMs = 200,
}: UseInfiniteScrollProps): void => {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (!hasNext || isLoading) return;

		const handleScroll = () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				const { innerHeight } = window;
				const { scrollTop, offsetHeight } = document.documentElement;

				if (
					innerHeight + scrollTop >= offsetHeight - threshold &&
					!isLoading &&
					hasNext
				) {
					onLoadMore();
				}
			}, debounceMs);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [isLoading, hasNext, onLoadMore, threshold, debounceMs]);
};
