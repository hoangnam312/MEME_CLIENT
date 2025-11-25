import { IRestParameterAttribute } from 'src/constants/type';
import { useEffect, useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';

export interface MInputWithinFormPropsType {
	addClass?: string;
	addClassWrapper?: string;
	addClassLabel?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>, value: string) => void;
	rest?: IRestParameterAttribute;
	type?: string;
	placeholder?: string;
	label?: string;
	labelButton?: string | React.ReactNode;
	icon?: React.ReactNode;
	suffix?: React.ReactNode;
	disabled?: boolean;
	readOnly?: boolean;
}

const MInputWithinForm = ({
	addClass = '',
	addClassWrapper = '',
	addClassLabel = '',
	value = '',
	onChange,
	onSubmit,
	rest = {},
	type = '',
	placeholder = '',
	label = '',
	labelButton = '',
	icon,
	suffix,
	disabled = false,
	readOnly = false,
}: MInputWithinFormPropsType) => {
	const [valueLocal, setValueLocal] = useState<string>(value);

	const onSubmitDefault = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Prevent form submission if disabled or readOnly
		if (disabled || readOnly) return;
		onSubmit?.(e, valueLocal);
	};

	const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Prevent changes if disabled or readOnly
		if (disabled || readOnly) return;
		onChange?.(e) ?? setValueLocal(e.target.value);
	};

	useEffect(() => {
		setValueLocal(value);
	}, [value]);

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
			dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
			border-gray-300 dark:border-gray-600
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
				<form onSubmit={onSubmitDefault}>
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
							icon ? 'pl-10' : 'pl-4'
						} pr-24 text-sm
						${getInputStateStyles()}
						${addClass}`}
						placeholder={placeholder}
						required={!disabled && !readOnly}
						value={valueLocal}
						onChange={onChangeLocal}
						{...rest}
					/>
					{labelButton && !disabled && (
						<div className="absolute bottom-2 right-2.5">
							<AButton
								addClass="!font-medium text-sm"
								rest={{
									type: 'submit',
									onClick: onSubmitDefault,
								}}
							>
								{labelButton}
							</AButton>
						</div>
					)}
					{suffix && suffix}
				</form>
			</div>
		</div>
	);
};

export default MInputWithinForm;
