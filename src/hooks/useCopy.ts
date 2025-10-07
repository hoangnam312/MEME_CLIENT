import { useState } from 'react';

async function getImageData(url: string): Promise<Blob> {
	const response = await fetch(url);
	return await response.blob();
}

async function convertToPng(blob: Blob): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Failed to get canvas context'));
				return;
			}
			ctx.drawImage(img, 0, 0);
			canvas.toBlob((pngBlob) => {
				if (pngBlob) {
					resolve(pngBlob);
				} else {
					reject(new Error('Conversion failed'));
				}
			}, 'image/png');
		};
		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = URL.createObjectURL(blob);
	});
}

async function copyImageToClipboard(data: Blob) {
	try {
		const mimeType = data.type || 'image/png';
		const item = new ClipboardItem({ [mimeType]: data });
		await navigator.clipboard.write([item]);
	} catch (error) {
		const pngBlob = await convertToPng(data);
		const item = new ClipboardItem({ 'image/png': pngBlob });
		await navigator.clipboard.write([item]);
	}
}

function useCopyImage() {
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	async function copyImage(url: string) {
		try {
			const imageData = await getImageData(url);
			await copyImageToClipboard(imageData);
			setIsCopied(true);
			return true;
		} catch (error) {
			setIsError(true);
			return false;
		}
	}

	async function copyText(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			setIsCopied(true);
			return true;
		} catch (error) {
			setIsError(true);
			return false;
		}
	}

	return { isCopied, isError, copyImage, copyText };
}

export default useCopyImage;
