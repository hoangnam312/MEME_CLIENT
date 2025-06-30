import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ATabs, { TabItem } from './ATabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faTachometerAlt,
	faCog,
	faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof ATabs> = {
	title: 'Atoms/ATabs',
	component: ATabs,
};
export default meta;

type Story = StoryObj<typeof ATabs>;

const tabs: TabItem[] = [
	{ key: 'profile', label: 'Profile', icon: <FontAwesomeIcon icon={faUser} /> },
	{
		key: 'dashboard',
		label: 'Dashboard',
		icon: <FontAwesomeIcon icon={faTachometerAlt} />,
	},
	{
		key: 'settings',
		label: 'Settings',
		icon: <FontAwesomeIcon icon={faCog} />,
	},
	{
		key: 'contacts',
		label: 'Contacts',
		icon: <FontAwesomeIcon icon={faAddressBook} />,
	},
	{ key: 'disabled', label: 'Disabled', isDisabled: true },
];

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState('dashboard');
		return <ATabs tabs={tabs} value={value} onChange={setValue} />;
	},
};
