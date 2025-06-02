import { useState } from 'react';

async function getImageData(url: string): Promise<Blob> {
	const response = await fetch(url);
	return await response.blob();
}

function copyImagePngToClipboard(data: Blob) {
	const item = new ClipboardItem({ 'image/png': data });
	navigator.clipboard.write([item]);
}

function useCopyImage() {
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	async function copyImage(url: string) {
		try {
			console.log('🚀 ~ copyImage ~ url:', url);
			const imageData = await getImageData(url);
			copyImagePngToClipboard(imageData);
			setIsCopied(true);
			return true;
		} catch (error) {
			console.log('🚀 ~ copyImage ~ error:', error);
			setIsError(true);
			return false;
		}
	}

	async function copyLink(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			setIsCopied(true);
			return true;
		} catch (error) {
			setIsError(true);
			return false;
		}
	}

	return { isCopied, isError, copyImage, copyLink };
}

export default useCopyImage;
