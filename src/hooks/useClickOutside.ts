import { useEffect, RefObject } from 'react';

interface UseClickOutsideOptions {
	enabled?: boolean;
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: MouseEvent | TouchEvent) => void,
	options: UseClickOutsideOptions = {}
): void => {
	const { enabled = true } = options;

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const listener = (event: MouseEvent | TouchEvent): void => {
			const el = ref?.current;
			if (!el || el.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return (): void => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler, enabled]);
};
