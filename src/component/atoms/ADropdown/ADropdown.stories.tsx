import type { Meta, StoryObj } from '@storybook/react';
import ADropdown, { ADropdownPropsType, IOption } from './ADropdown';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const meta: Meta<typeof ADropdown> = {
	component: ADropdown,
	title: 'Atoms/ADropdown',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const options: IOption[] = [
	{
		label: 'Profile',
		icon: <FontAwesomeIcon icon={faUser} className="mr-2" />,
		value: 'profile',
	},
	{
		label: 'Settings',
		icon: <FontAwesomeIcon icon={faCog} className="mr-2" />,
		value: 'settings',
	},
	{
		label: 'Logout',
		icon: <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />,
		value: 'logout',
	},
];

export const Default: Story = {
	args: {
		isOpen: true,
		options: options,
		buttonOutside: (
			<button className="rounded-md bg-blue-500 px-4 py-2 text-white">
				Open Dropdown
			</button>
		),
		onSelect: (value) => alert(`Selected: ${value}`),
	} as ADropdownPropsType,
};
