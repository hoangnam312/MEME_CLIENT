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
	labelButton?: string;
	icon?: React.ReactNode;
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
}: MInputWithinFormPropsType) => {
	const [valueLocal, setValueLocal] = useState<string>(value);

	const onSubmitDefault = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(e, valueLocal);
	};

	const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e) ?? setValueLocal(e.target.value);
	};

	useEffect(() => {
		setValueLocal(value);
	}, [value]);

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
				<form onSubmit={onSubmitDefault}>
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						{icon}
					</div>
					<input
						type={type}
						className={`block w-full rounded-lg border border-gray-300 
						bg-gray-50 p-4 pl-10 text-sm 
						text-gray-900
						focus-within:border-blue-500 focus-within:ring-blue-500 
						focus:border-blue-500 focus:ring-blue-500 
						dark:border-gray-600 dark:bg-gray-700 
						dark:text-white dark:placeholder-gray-400 
						dark:focus:border-blue-500 dark:focus:ring-blue-500 
						${addClass}`}
						placeholder={placeholder}
						required
						value={valueLocal}
						onChange={onChangeLocal}
						{...rest}
					/>
					{labelButton && (
						<div className="absolute bottom-2 right-2.5">
							<AButton
								addClass="!font-medium text-sm"
								content={labelButton}
								rest={{
									type: 'submit',
									onClick: onSubmitDefault,
								}}
							/>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default MInputWithinForm;
