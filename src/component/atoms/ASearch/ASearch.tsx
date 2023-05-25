import i18next from 'i18next';
import { IRestParameterAttribute } from 'src/constants/type';
import AButton from '../AButton/AButton';

export interface ASearchPropsType {
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

const ASearch = ({
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
}: ASearchPropsType) => {
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
					{icon || (
						<svg
							className="h-5 w-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					)}
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
				<div className="absolute bottom-2 right-2.5">
					<AButton
						type="submit"
						addClass="!font-medium text-sm"
						content={labelButton || i18next.t('search')}
					/>
				</div>
			</div>
		</div>
	);
};

export default ASearch;
