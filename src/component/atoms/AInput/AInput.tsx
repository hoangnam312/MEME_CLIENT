import { IRestParameterAttribute } from 'src/constants/type';

export interface AInputPropsType {
	addClass?: string;
	addClassWrapper?: string;
	addClassLabel?: string;
	rest?: IRestParameterAttribute;
	type?: string;
	label?: string;
	icon?: React.ReactNode;
}

const AInput = ({
	addClass = '',
	addClassWrapper = '',
	addClassLabel = '',
	rest = {},
	type = '',
	label = '',
	icon,
}: AInputPropsType) => {
	return (
		<div className={`${addClassWrapper}`}>
			{label && (
				<label
					htmlFor={type}
					className={`mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300 ${addClassLabel}`}
				>
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						{icon}
					</div>
				)}
				<input
					type={type}
					className={`block w-full rounded-lg border border-gray-300 
						bg-gray-50 p-4 ${icon ? 'pl-10' : ''} text-sm 
						text-gray-900
						focus-within:border-blue-500 focus-within:ring-blue-500 
						focus:border-blue-500 focus:ring-blue-500 
						dark:border-gray-600 dark:bg-gray-700 
						dark:text-white dark:placeholder-gray-400 
						dark:focus:border-blue-500 dark:focus:ring-blue-500 
						${addClass}`}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default AInput;
