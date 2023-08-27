import { ReactNode } from 'react';

export interface AModalPropsType {
	isOpen: boolean;
	closeModal: () => void;
	children?: ReactNode;
	onClickBackdrop?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onClickWrapChildren?: (e: React.MouseEvent<HTMLDivElement>) => void;
	addClassBackdrop?: string;
	addClassWrap?: string;
}

export const AModal = ({
	isOpen = false,
	closeModal,
	onClickBackdrop,
	onClickWrapChildren,
	children,
	addClassBackdrop,
	addClassWrap,
}: AModalPropsType) => {
	if (!isOpen) return <></>;

	return (
		<div
			className={`fixed inset-0 z-50 flex w-full items-center justify-center overflow-hidden backdrop-blur-sm ${addClassBackdrop}`}
			onClick={(e) => {
				onClickBackdrop?.(e);
				closeModal();
			}}
		>
			<div
				className={`md:max-w-11/12 z-50 mx-auto w-4/12 overflow-y-auto rounded-lg border bg-white shadow-lg ${addClassWrap}`}
			>
				<div
					className="px-6 py-4"
					onClick={(e) => {
						e.stopPropagation();
						onClickWrapChildren?.(e);
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};
