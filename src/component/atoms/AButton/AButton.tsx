import { ReactNode } from 'react';
import { IRestParameterAttribute } from 'src/constants/type';

export interface AButtonPropsType {
	children?: ReactNode;
	addClass?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	isDisabled?: boolean;
	content?: string;
	rest?: IRestParameterAttribute;
}

const AButton = ({
	children,
	addClass = '',
	onClick,
	isDisabled = false,
	content = 'AButton',
	rest = {},
}: AButtonPropsType) => {
	return (
		<button
			className={`
				group relative flex items-center justify-center rounded-full bg-emerald-300 
				bg-gradient-to-r px-5 py-2 font-semibold text-violet-900 shadow-xl ${addClass}
				${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
			`}
			onClick={onClick}
			disabled={isDisabled}
			{...rest}
		>
			{children || <p>{content}</p>}
		</button>
	);
};

export default AButton;
