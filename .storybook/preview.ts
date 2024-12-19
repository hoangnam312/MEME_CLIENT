import type { Preview } from '@storybook/react';
import '../dist/output.css';
import i18n from '../src/i18n/i18next.config';

const preview: Preview = {
	initialGlobals: {
		locale: 'en',
		locales: {
				en: 'English',
				vi: 'Tiếng việt',
		},
},
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		i18n,
	},
};

export default preview;
