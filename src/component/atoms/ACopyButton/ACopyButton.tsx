import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck,
	faCopy,
	faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import AButton from '../AButton/AButton';
import ALoading from '../ALoading/ALoading';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import useCopyImage from 'src/hooks/useCopy';

export enum CopyState {
	Idle = 'idle',
	Copying = 'copying',
	Success = 'success',
	Failure = 'failure',
}

// Generic copy strategies
export type CopyStrategy = 'text' | 'url' | 'image' | 'object';

// Generic copy data interface
export interface CopyData<T> {
	value: T;
	strategy: CopyStrategy;
	// For image strategy, specify the URL property path
	imageUrlPath?: keyof T & string;
	// For object strategy, specify which property to copy or use JSON.stringify
	objectProperty?: keyof T & string;
}

// Tracking callback interface
export interface TrackingCallback<T> {
	onSuccess?: (data: T) => void | Promise<void>;
	onFailure?: (data: T, error: unknown) => void | Promise<void>;
}

// Generic copy button props
export interface ACopyButtonProps<T> {
	data: CopyData<T>;
	tracking?: TrackingCallback<T>;
	disabled?: boolean;
	className?: string;
	timeout?: number; // Reset timeout in milliseconds
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'minimal' | 'outline';
}

// Copy utility functions using the useCopy hook
const createCopyStrategies = <T,>(
	copyImage: (url: string) => Promise<boolean>,
	copyText: (text: string) => Promise<boolean>
) => ({
	text: async (value: string) => copyText(value),
	url: async (value: string) => copyText(value),
	image: async (value: string) => copyImage(value),
	object: async (value: T, property?: keyof T & string) => {
		const textToCopy = property
			? String(value[property])
			: JSON.stringify(value, null, 2);
		return await copyText(textToCopy);
	},
});

// Get variant styles
const getVariantStyles = (variant: ACopyButtonProps<unknown>['variant']) => {
	switch (variant) {
		case 'minimal':
			return '!bg-transparent !text-gray-600 hover:!text-gray-800 hover:!bg-gray-100 !shadow-none';
		case 'outline':
			return '!bg-transparent !border-2 !border-emerald-300 !text-emerald-600 hover:!bg-emerald-50';
		default:
			return '';
	}
};

// Get size styles
const getSizeStyles = (size: ACopyButtonProps<unknown>['size']) => {
	switch (size) {
		case 'sm':
			return '!px-3 !py-1 !text-sm';
		case 'lg':
			return '!px-6 !py-3 !text-lg';
		default:
			return '';
	}
};

// Map size to FontAwesome SizeProp
const mapSizeToFontAwesome = (
	size: ACopyButtonProps<unknown>['size']
): SizeProp => {
	switch (size) {
		case 'sm':
			return 'sm';
		case 'lg':
			return 'lg';
		default:
			return '1x';
	}
};

// Generic Copy Button Component
const ACopyButton = <T,>({
	data,
	tracking,
	disabled = false,
	className = '',
	timeout = 3000,
	size = 'md',
	variant = 'default',
}: ACopyButtonProps<T>) => {
	const [copyState, setCopyState] = useState<CopyState>(CopyState.Idle);
	const { copyImage, copyText } = useCopyImage();
	let copyTimeout: NodeJS.Timeout | null = null;

	// Create copy strategies using the hook functions
	const copyStrategies = createCopyStrategies<T>(copyImage, copyText);

	const handleCopy = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		setCopyState(CopyState.Copying);
		try {
			let result = false;
			switch (data.strategy) {
				case 'text':
					result = await copyStrategies.text(data.value as unknown as string);
					break;
				case 'url':
					result = await copyStrategies.url(data.value as unknown as string);
					break;
				case 'image': {
					const imageUrl = data.imageUrlPath
						? String((data.value as Record<string, unknown>)[data.imageUrlPath])
						: (data.value as unknown as string);
					result = await copyStrategies.image(imageUrl);
					break;
				}
				case 'object':
					result = await copyStrategies.object(data.value, data.objectProperty);
					break;
				default:
					result = false;
			}
			if (result) {
				setCopyState(CopyState.Success);
				await tracking?.onSuccess?.(data.value);
			} else {
				setCopyState(CopyState.Failure);
				await tracking?.onFailure?.(
					data.value,
					new Error('Copy operation failed')
				);
			}
		} catch (error) {
			setCopyState(CopyState.Failure);
			await tracking?.onFailure?.(data.value, error);
		}
		if (copyTimeout) clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			setCopyState(CopyState.Idle);
		}, timeout);
	};

	const combinedClassName = [
		getVariantStyles(variant),
		getSizeStyles(size),
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<AButton
			onClick={handleCopy}
			isDisabled={disabled || copyState === CopyState.Copying}
			addClass={combinedClassName}
		>
			{copyState === CopyState.Copying ? (
				<ALoading size={mapSizeToFontAwesome(size)} />
			) : copyState === CopyState.Success ? (
				<FontAwesomeIcon icon={faCircleCheck} />
			) : copyState === CopyState.Failure ? (
				<FontAwesomeIcon icon={faCircleXmark} />
			) : (
				<FontAwesomeIcon icon={faCopy} />
			)}
		</AButton>
	);
};

export default ACopyButton;
