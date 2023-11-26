import { useState } from 'react';

async function getImageData(url: string): Promise<Blob> {
	const response = await fetch(url);
	return await response.blob();
}

function copyImagePngToClipboard(data: Blob) {
	const item = new ClipboardItem({ 'image/png': data });
	navigator.clipboard.write([item]);
}

async function convertImageToPngByLink(url: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.setAttribute('crossorigin', 'anonymous');
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Could not create canvas context'));
				return;
			}
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			resolve(canvas.toDataURL());
		};
		img.onerror = reject;
		img.src = url;
	});
}

function useCopyImage() {
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	async function copyImage(url: string) {
		try {
			const pngImage = await convertImageToPngByLink(url);
			const imageData = await getImageData(pngImage);
			copyImagePngToClipboard(imageData);
			setIsCopied(true);
			return true;
		} catch (error) {
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
