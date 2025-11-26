import { ReactNode } from 'react';
import { IRestParameterAttribute } from 'src/constants/type';

export interface ASquareOutlineButtonPropsType {
	children?: ReactNode;
	addClass?: string;
	content?: string;
	onClick?: () => void;
	disabled?: boolean;
	rest?: IRestParameterAttribute;
}

const ASquareOutlineButton = ({
	children,
	addClass = '',
	content = 'ASquareOutlineButton',
	onClick,
	disabled = false,
	rest = {},
}: ASquareOutlineButtonPropsType) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`flex items-center justify-center rounded-md px-3 py-2 text-xs font-bold text-violet-900 shadow-md shadow-emerald-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-3 md:text-sm ${addClass}`}
			{...rest}
		>
			{children || <span>{content}</span>}
		</button>
	);
};

export default ASquareOutlineButton;
