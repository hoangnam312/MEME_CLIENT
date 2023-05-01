import React, { ReactNode } from 'react';
import { IRestParameterAttribute } from 'src/constants/type';

export interface AButtonPropsType {
	children?: ReactNode;
	addClass?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	content?: string;
	rest?: IRestParameterAttribute;
}

const AButton = ({
	children,
	addClass = '',
	onClick,
	content = 'AButton',
	rest = {},
}: AButtonPropsType) => {
	return (
		<button
			className={`relative rounded-full shadow-xl group flex items-center text-white justify-center bg-gradient-to-r bg-main-background text-main-color px-5 py-2 font-semibold ${addClass}`}
			onClick={onClick}
			{...rest}
		>
			{children || (
				<>
					<p>{content}</p>
				</>
			)}
		</button>
	);
};

export default AButton;
