export interface IOption {
	label: string;
	icon?: React.ReactNode;
	value: string;
}

export interface ADropdownPropsType {
	isOpen?: boolean;
	options?: IOption[];
	onSelect?: (value: string) => void;
	buttonOutside: React.ReactNode;
}

const ADropdown = ({
	isOpen = false,
	options = [],
	buttonOutside,
	onSelect,
}: ADropdownPropsType) => {
	return (
		<div className="">
			<div>{buttonOutside}</div>

			{isOpen && !!options?.length && (
				<div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
					<div
						className="p-2 py-2"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="dropdown-button"
					>
						{options.map((option) => (
							<div
								className=" flex cursor-pointer rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100"
								onClick={() => onSelect?.(option.value)}
								key={option.value}
							>
								{option?.icon}
								{option.label}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ADropdown;
