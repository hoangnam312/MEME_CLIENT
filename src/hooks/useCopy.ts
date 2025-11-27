import { useState } from 'react';
import { toast } from 'react-toastify';
import { t } from 'i18next';

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

function useCopyImage(options: UseCopyOptions = {}) {
	const { enableNotifications = true } = options;
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
