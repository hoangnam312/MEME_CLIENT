import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import MessengerIcon from 'src/assets/icon/MessengerIcon';
import { IMeme } from 'src/constants/type';
import { useClickOutside } from 'src/hooks/useClickOutside';
import useCopyImage from 'src/hooks/useCopy';
import { ESourceType, trackingMeme } from 'src/service/meme';
import {
	copyMemeLink,
	getMemeShareUrl,
	getShareUrls,
	openShareWindow,
} from 'src/utils/shareUtils';

export interface MSharePopoverProps {
	isOpen: boolean;
	onClose: () => void;
	memeData: IMeme;
	sourceType?: ESourceType;
	anchorEl?: HTMLElement | null;
}

const MSharePopover = ({
	isOpen,
	onClose,
	memeData,
	sourceType = ESourceType.Other,
	anchorEl,
}: MSharePopoverProps) => {
	const { copyText } = useCopyImage({ enableNotifications: false });
	const popoverRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState<{
		top: number;
		left: number;
		placement: 'top' | 'bottom';
	}>({ top: 0, left: 0, placement: 'bottom' });

	useClickOutside(popoverRef, onClose, { enabled: isOpen });

	const shareUrl = getMemeShareUrl(memeData._id);
	const shareUrls = getShareUrls(shareUrl, memeData);

	const handleShare = async (
		platform:
			| 'facebook'
			| 'twitter'
			| 'whatsapp'
			| 'pinterest'
			| 'messenger'
			| 'copy'
	) => {
		if (platform === 'copy') {
			const success = await copyMemeLink(memeData._id, copyText);
			if (success) {
				toast.success(t('share.success'));
				trackingMeme(
					{
						memeId: memeData._id,
						action: 'copy',
					},
					{
						sourceType: sourceType,
					}
				);
			} else {
				toast.error(t('share.error'));
			}
		} else {
			openShareWindow(shareUrls[platform]);
			trackingMeme(
				{
					memeId: memeData._id,
					action: 'share',
				},
				{
					sourceType: sourceType,
				}
			);
		}
		onClose();
	};

	const shareOptions = [
		{
			name: t('share.copyLink'),
			icon: <FontAwesomeIcon size="lg" className="h-6 w-6" icon={faLink} />,
			color: 'text-gray-700',
			bgColor: 'bg-gray-100 hover:bg-gray-200',
			action: 'copy' as const,
		},
		{
			name: t('share.facebook'),
			icon: <FacebookIcon addClass="!mr-0" />,
			color: 'text-blue-600',
			bgColor: 'bg-blue-100 hover:bg-blue-200',
			action: 'facebook' as const,
		},
		{
			name: t('share.messenger'),
			icon: <MessengerIcon addClass="!mr-0" />,
			color: 'text-blue-500',
			bgColor: 'bg-blue-50 hover:bg-blue-100',
			action: 'messenger' as const,
		},
	];

	// Calculate position based on anchor element
	useEffect(() => {
		if (!isOpen || !anchorEl || !popoverRef.current) {
			return;
		}

		const updatePosition = (): void => {
			const anchorRect = anchorEl.getBoundingClientRect();
			const popoverRect = popoverRef.current?.getBoundingClientRect();

			if (!popoverRect) {
				return;
			}

			const viewportHeight = window.innerHeight;
			const viewportWidth = window.innerWidth;
			const spaceAbove = anchorRect.top;
			const spaceBelow = viewportHeight - anchorRect.bottom;
			const popoverHeight = popoverRect.height;
			const popoverWidth = popoverRect.width;

			// Determine if popover should be above or below
			const placement: 'top' | 'bottom' =
				spaceBelow >= popoverHeight || spaceBelow > spaceAbove
					? 'bottom'
					: 'top';

			let top: number;
			if (placement === 'bottom') {
				top = anchorRect.bottom + 8; // 8px gap
			} else {
				top = anchorRect.top - popoverHeight - 8; // 8px gap
			}

			// Center horizontally relative to anchor
			let left = anchorRect.left + anchorRect.width / 2 - popoverWidth / 2;

			// Keep within viewport bounds
			const padding = 16;
			if (left < padding) {
				left = padding;
			} else if (left + popoverWidth > viewportWidth - padding) {
				left = viewportWidth - popoverWidth - padding;
			}

			setPosition({ top, left, placement });
		};

		updatePosition();
		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);

		return (): void => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	}, [isOpen, anchorEl]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			{/* Invisible backdrop for mobile */}
			<div
				className="fixed inset-0 z-40 bg-transparent md:hidden"
				onClick={onClose}
			/>

			{/* Popover */}
			<div
				ref={popoverRef}
				className="fixed z-50 rounded-lg border border-gray-200 bg-white shadow-xl"
				style={{
					top: `${position.top}px`,
					left: `${position.left}px`,
					minWidth: '280px',
					maxWidth: '90vw',
				}}
			>
				{/* Content */}
				<div className="relative p-3 md:p-4">
					<div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
						{shareOptions.map((option) => (
							<button
								key={option.action}
								onClick={() => handleShare(option.action)}
								className={`flex flex-col items-center gap-1.5 rounded-lg p-2.5 transition-all md:p-3 ${option.bgColor}`}
							>
								<div className="inline-flex items-center justify-center rounded-full">
									{option.icon}
								</div>
								<span
									className={`text-xs font-medium ${option.color} md:text-sm`}
								>
									{option.name}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default MSharePopover;
