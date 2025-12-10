import { useState } from 'react';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import memenyaWhiteIcon from '/memenya_white.svg';
import { useAuthen } from './useAuthen';

export type UseCopyOptions = {
	enableNotifications?: boolean;
};

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

function getBrowserName(): string {
	const userAgent = navigator.userAgent;

	if (userAgent.includes('Firefox')) {
		return 'Firefox';
	} else if (userAgent.includes('Edg')) {
		return 'Edge';
	} else if (userAgent.includes('Chrome')) {
		return 'Chrome';
	} else if (userAgent.includes('Safari')) {
		return 'Safari';
	} else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
		return 'Opera';
	}

	return 'unknown';
}

function isProblematicAndroidDevice(): boolean {
	const ua = navigator.userAgent.toLowerCase();

	const problematicBrands = [
		'huawei',
		'honor',
		'emui',
		'harmonyos',
		'xiaomi',
		'redmi',
		'poco',
		'miui',
		'oppo',
		'realme',
		'coloros',
		'vivo',
		'iqoo',
		'funtouch',
		'nubia',
		'zte',
	];

	return problematicBrands.some((brand) => ua.includes(brand));
}

async function getImageData(url: string): Promise<Blob> {
	const response = await fetch(url, {
		mode: 'cors',
		credentials: 'omit',
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

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
				reject(new Error('Canvas context failed'));
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
		img.onerror = () => reject(new Error('Image load failed'));
		img.src = URL.createObjectURL(blob);
	});
}

async function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = src;
	});
}

async function addWatermark(
	blob: Blob,
	watermarkUrl: string,
	sizePercent = 20,
	paddingPercent = 2,
	opacity = 0.5
): Promise<Blob> {
	// Load main image
	const mainImageUrl = URL.createObjectURL(blob);
	const mainImage = await loadImage(mainImageUrl);

	// Load watermark image
	const watermarkImage = await loadImage(watermarkUrl);

	return new Promise((resolve, reject) => {
		// Create canvas
		const canvas = document.createElement('canvas');
		canvas.width = mainImage.width;
		canvas.height = mainImage.height;
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			reject(new Error('Canvas context failed'));
			return;
		}

		// Draw main image
		ctx.drawImage(mainImage, 0, 0);

		// Calculate watermark size based on percentage of image width
		const watermarkSize = (canvas.width * sizePercent) / 100;
		const padding = (canvas.width * paddingPercent) / 100;

		// Calculate watermark position (bottom right)
		const watermarkX = canvas.width - watermarkSize - padding * 3;
		const watermarkY = canvas.height - watermarkSize - padding;

		// Draw watermark with opacity
		ctx.globalAlpha = opacity;
		ctx.drawImage(
			watermarkImage,
			watermarkX,
			watermarkY,
			watermarkSize,
			watermarkSize
		);
		ctx.globalAlpha = 1.0;

		// Clean up object URLs
		URL.revokeObjectURL(mainImageUrl);

		// Convert to blob
		canvas.toBlob((resultBlob) => {
			if (resultBlob) {
				resolve(resultBlob);
			} else {
				reject(new Error('Failed to create watermarked image'));
			}
		}, 'image/png');
	});
}

function useCopyImage(options: UseCopyOptions = {}) {
	const { enableNotifications = true } = options;
	const { preferences } = useAuthen();
	const enableWatermark = preferences.enableWatermark ?? true;
	const [isCopied, setIsCopied] = useState(false);
	const [isError, setIsError] = useState(false);

	async function copyImage(url: string) {
		try {
			// Check browser support
			if (!isClipboardImageSupported()) {
				setIsError(true);
				if (enableNotifications) {
					const browser = getBrowserName();
					if (browser === 'Firefox') {
						toast.error(t('clipboard.warning.firefoxNotSupported'));
					} else {
						toast.error(t('clipboard.error.browserNotSupported'));
					}
				}
				return false;
			}

			// Warn about problematic devices
			if (isProblematicAndroidDevice() && enableNotifications) {
				toast.warning(t('clipboard.warning.deviceNotSupported'));
			}

			// Create clipboard item with promise
			const item = new ClipboardItem({
				'image/png': getImageData(url).then(async (blob) => {
					// Convert to PNG if needed
					let processedBlob = blob;
					if (!(blob.type === 'image/png' || canCopyImageFormat(blob.type))) {
						processedBlob = await convertToPng(blob);
					}

					// Add watermark with memenya icon if enabled
					if (enableWatermark) {
						processedBlob = await addWatermark(processedBlob, memenyaWhiteIcon);
					}

					return processedBlob;
				}),
			});

			await navigator.clipboard.write([item]);
			setIsCopied(true);

			return true;
		} catch (error) {
			setIsError(true);

			if (enableNotifications) {
				if (error instanceof DOMException) {
					if (error.name === 'NotAllowedError') {
						toast.error(t('clipboard.error.permissionDenied'));
					} else if (error.name === 'SecurityError') {
						toast.error(t('clipboard.error.networkError'));
					} else {
						toast.error(t('clipboard.error.imageFailed'));
					}
				} else if (error instanceof TypeError) {
					toast.error(t('clipboard.error.networkError'));
				} else if (error instanceof Error) {
					if (
						error.message.includes('HTTP 404') ||
						error.message.includes('HTTP 403')
					) {
						toast.error(t('clipboard.error.imageNotFound'));
					} else {
						toast.error(t('clipboard.error.imageFailed'));
					}
				} else {
					toast.error(t('clipboard.error.imageFailed'));
				}
			}

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

			if (enableNotifications) {
				if (error instanceof DOMException && error.name === 'NotAllowedError') {
					toast.error(t('clipboard.error.permissionDenied'));
				} else {
					toast.error(t('clipboard.error.imageFailed'));
				}
			}

			return false;
		}
	}

	return { isCopied, isError, copyImage, copyText };
}

export default useCopyImage;
