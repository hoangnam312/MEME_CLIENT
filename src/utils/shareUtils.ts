import { IMeme } from 'src/constants/type';
import { t } from 'i18next';

/**
 * Generates the share URL for a specific meme
 * @param memeId - The ID of the meme to share
 * @returns The complete URL to view the meme
 */
export function getMemeShareUrl(memeId: string): string {
	return `${window.location.origin}/?view=${memeId}`;
}

/**
 * Generates URLs for sharing on different social platforms
 * @param memeUrl - The URL of the meme to share
 * @param memeData - The meme data containing name and description
 * @returns Object with URLs for each social platform
 */
export function getShareUrls(
	memeUrl: string,
	memeData: IMeme
): {
	facebook: string;
	twitter: string;
	whatsapp: string;
	pinterest: string;
	messenger: string;
} {
	const encodedUrl = encodeURIComponent(memeUrl);
	const encodedTitle = encodeURIComponent(
		memeData.name || t('share.defaultTitle')
	);
	const encodedDescription = encodeURIComponent(
		memeData.description || t('share.defaultDescription')
	);
	const encodedImageUrl = encodeURIComponent(memeData.image.imageMedium);

	const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;

	return {
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
		whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
		pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedDescription}`,
		messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=${facebookAppId}&redirect_uri=${encodeURIComponent(
			window.location.origin
		)}`,
	};
}

/**
 * Opens a share window in a popup
 * @param url - The URL to open
 * @param width - Width of the popup window (default: 600)
 * @param height - Height of the popup window (default: 400)
 */
export function openShareWindow(url: string, width = 600, height = 400): void {
	const left = window.screen.width / 2 - width / 2;
	const top = window.screen.height / 2 - height / 2;

	window.open(
		url,
		'share',
		`width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0,resizable=1`
	);
}

/**
 * Copies the meme link to clipboard
 * @param memeId - The ID of the meme
 * @param copyText - The copyText function from useCopy hook
 * @returns Promise<boolean> - Whether the copy was successful
 */
export async function copyMemeLink(
	memeId: string,
	copyText: (text: string) => Promise<boolean>
): Promise<boolean> {
	const shareUrl = getMemeShareUrl(memeId);
	return await copyText(shareUrl);
}
