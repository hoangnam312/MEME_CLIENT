/**
 * Utility functions for managing meme view state in URL query parameters
 */

const MEME_VIEW_PARAM = 'view';

/**
 * Get the meme ID from URL query parameters
 */
export const getMemeIdFromUrl = (): string | null => {
	const params = new URLSearchParams(window.location.search);
	return params.get(MEME_VIEW_PARAM);
};

/**
 * Add meme ID to URL query parameters
 */
export const addMemeIdToUrl = (memeId: string): void => {
	const url = new URL(window.location.href);
	url.searchParams.set(MEME_VIEW_PARAM, memeId);
	window.history.pushState({}, '', url.toString());
};

/**
 * Remove meme ID from URL query parameters
 */
export const removeMemeIdFromUrl = (): void => {
	const url = new URL(window.location.href);
	url.searchParams.delete(MEME_VIEW_PARAM);
	window.history.pushState({}, '', url.toString());
};

/**
 * Check if a meme view parameter exists in URL
 */
export const hasMemeViewParam = (): boolean => {
	return getMemeIdFromUrl() !== null;
};
