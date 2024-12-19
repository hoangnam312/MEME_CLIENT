import { ReactNode } from 'react';
import { IRestParameterAttribute } from 'src/constants/type';

export interface ALinkPropsType {
	children?: ReactNode;
	addClass?: string;
	content?: string;
	href?: string;
	rest?: IRestParameterAttribute;
}

const ALink = ({
	children,
	addClass = '',
	content = 'ALink',
	href = '#',
	rest = {},
}: ALinkPropsType) => {
	return (
		<a
			href={href}
			className={`flex items-center justify-center rounded-md px-4 py-3 font-bold text-violet-900 shadow-md shadow-emerald-300 hover:bg-gray-100 ${addClass}`}
			{...rest}
		>
			{children || <span>{content}</span>}
		</a>
	);
};

export default ALink;
