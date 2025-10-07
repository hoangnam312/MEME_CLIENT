import { useEffect, useState } from 'react';

interface UseScrollToTopProps {
	threshold?: number;
}

export const useScrollToTop = ({
	threshold = 300,
}: UseScrollToTopProps = {}) => {
	const [showButton, setShowButton] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			setShowButton(scrollTop > threshold);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [threshold]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return { showButton, scrollToTop };
};
