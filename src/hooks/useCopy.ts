import { useState } from 'react';

function isClipboardImageSupported(): boolean {
	return (
		'clipboard' in navigator &&
		'write' in navigator.clipboard &&
		typeof ClipboardItem !== 'undefined'
	);
}

function canCopyImageFormat(mimeType: string): boolean {
	if (typeof ClipboardItem === 'undefined') return false;
	if ('supports' in ClipboardItem) {
		return (
			(ClipboardItem as { supports?: (type: string) => boolean }).supports?.(
				mimeType
			) ?? false
		);
	}
	return mimeType === 'image/png';
}

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

function useCopyImage() {
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	async function copyImage(url: string) {
		try {
			if (!isClipboardImageSupported()) {
				setIsError(true);
				return false;
			}

			const item = new ClipboardItem({
				'image/png': getImageData(url).then(async (blob) => {
					if (blob.type === 'image/png' || canCopyImageFormat(blob.type)) {
						return blob;
					}
					return convertToPng(blob);
				}),
			});

			await navigator.clipboard.write([item]);
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
