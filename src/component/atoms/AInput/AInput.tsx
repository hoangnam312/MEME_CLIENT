import { IRestParameterAttribute } from 'src/constants/type';

export interface AInputPropsType {
	addClass?: string;
	addClassWrapper?: string;
	addClassLabel?: string;
	rest?: IRestParameterAttribute;
	type?: string;
	label?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	readOnly?: boolean;
}

const AInput = ({
	addClass = '',
	addClassWrapper = '',
	addClassLabel = '',
	rest = {},
	type = '',
	label = '',
	icon,
	disabled = false,
	readOnly = false,
}: AInputPropsType) => {
	// Define state-specific styles
	const getInputStateStyles = () => {
		if (disabled) {
			return `
				bg-gray-200 text-gray-500 cursor-not-allowed
				dark:bg-gray-800 dark:text-gray-500
				border-gray-300 dark:border-gray-600
				focus:border-gray-300 focus:ring-0
				dark:focus:border-gray-600 dark:focus:ring-0
			`;
		}

		if (readOnly) {
			return `
				bg-gray-100 text-gray-900 cursor-text
				dark:bg-gray-600 dark:text-white
				border-gray-300 dark:border-gray-500
				focus:border-blue-400 focus:ring-blue-200
				dark:focus:border-blue-400 dark:focus:ring-blue-800
				select-text
			`;
		}

		// Default interactive state
		return `
			bg-gray-50 text-gray-900
			dark:bg-emerald-100 dark:text-black-800 dark:placeholder-gray-400
			border-gray-300 dark:border-violet-400
			focus-within:border-blue-500 focus-within:ring-blue-500
			focus:border-blue-500 focus:ring-blue-500
			dark:focus:border-blue-500 dark:focus:ring-blue-500
		`;
	};

	const getLabelStateStyles = () => {
		if (disabled) {
			return 'text-gray-400 dark:text-gray-500';
		}
		return 'text-gray-900 dark:text-gray-300';
	};

	return (
		<div className={`${addClassWrapper}`}>
			{label && (
				<label
					htmlFor={type}
					className={`mb-2 block text-sm font-medium ${getLabelStateStyles()} ${addClassLabel}`}
				>
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div
						className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ${
							disabled
								? 'text-gray-400 dark:text-gray-500'
								: 'text-gray-500 dark:text-gray-400'
						}`}
					>
						{icon}
					</div>
				)}
				<input
					type={type}
					disabled={disabled}
					readOnly={readOnly}
					className={`block w-full rounded-lg border p-4 ${
						icon ? 'pl-10' : ''
					} text-sm 
						${getInputStateStyles()}
						${addClass}`}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default AInput;
