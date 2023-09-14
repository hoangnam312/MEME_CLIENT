import { IRestParameterAttribute } from 'src/constants/type';
import AButton from '../AButton/AButton';

export interface AInputPropsType {
	addClass?: string;
	addClassWrapper?: string;
	addClassLabel?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	rest?: IRestParameterAttribute;
	type?: string;
	placeholder?: string;
	label?: string;
	labelButton?: string;
	icon?: React.ReactNode;
}

const AInput = ({
	addClass = '',
	addClassWrapper = '',
	addClassLabel = '',
	onChange,
	rest = {},
	type = '',
	placeholder = '',
	label = '',
	labelButton = '',
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
					onChange={onChange}
					{...rest}
				/>
				{labelButton && (
					<div className="absolute bottom-2 right-2.5">
						<AButton
							type="submit"
							addClass="!font-medium text-sm"
							content={labelButton}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default AInput;
