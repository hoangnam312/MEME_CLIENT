import React from 'react';
import { t } from 'i18next';
import AModal from '../AModal/AModal';
import AButton from '../AButton/AButton';
import AOutlineButton from '../AOutlineButton/AOutlineButton';

export interface AConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	isDangerous?: boolean;
	isLoading?: boolean;
}

const AConfirmModal: React.FC<AConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = t('confirm'),
	cancelText = t('cancel'),
	isDangerous = false,
	isLoading = false,
}) => {
	return (
		<AModal isOpen={isOpen} closeModal={onClose} addClassWrap="!w-1/3 min-w-96">
			<div className="space-y-4">
				{/* Header */}
				<div className="text-center">
					<h3
						className={`text-lg font-semibold ${
							isDangerous ? 'text-red-800' : 'text-gray-900'
						}`}
					>
						{title}
					</h3>
				</div>

				{/* Message */}
				<div className="text-center">
					<p className="text-sm text-gray-600">{message}</p>
				</div>

				{/* Actions */}
				<div className="flex justify-end space-x-3 pt-4">
					<AOutlineButton
						onClick={isLoading ? undefined : onClose}
						addClass={`px-4 py-2 ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						{cancelText}
					</AOutlineButton>
					<AButton
						onClick={onConfirm}
						isDisabled={isLoading}
						addClass={`px-4 py-2 ${
							isDangerous ? '!bg-red-600 hover:!bg-red-700 text-white' : ''
						}`}
						content={isLoading ? t('loading') : confirmText}
					/>
				</div>
			</div>
		</AModal>
	);
};

export default AConfirmModal;
