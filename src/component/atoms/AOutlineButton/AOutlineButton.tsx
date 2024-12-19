import { ReactNode } from 'react';
import { IRestParameterAttribute } from 'src/constants/type';

export interface AOutlineButtonPropsType {
	children?: ReactNode;
	addClass?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	content?: string;
	rest?: IRestParameterAttribute;
}

const AOutlineButton = ({
	children,
	addClass = '',
	onClick,
	content = 'AOutlineButton',
	rest = {},
}: AOutlineButtonPropsType) => {
	return (
		<button
			className={`
				group relative flex items-center justify-center rounded-full border-2 border-emerald-300 
				px-5 py-2 font-semibold text-violet-900 shadow-xl hover:bg-emerald-300 ${addClass}
			`}
			onClick={onClick}
			{...rest}
		>
			{children || <p>{content}</p>}
		</button>
	);
};

export default AOutlineButton;
