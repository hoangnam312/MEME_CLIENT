import React from 'react';

import { scan } from 'react-scan';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from 'react-i18next';

import ReactDOM from 'react-dom/client';

import { App } from './App.tsx';
import AppRoutes from './routes/root.tsx';
import i18n from './i18n/i18next.config.ts';

import 'src/assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';

// React scan for dev. Ref: https://github.com/aidenybai/react-scan
scan({
	enabled: true,
	log: false, // logs render info to console (default: false)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n} defaultNS={'translation'}>
			<BrowserRouter>
				<AppRoutes />
				<App />
			</BrowserRouter>
			<ToastContainer />
		</I18nextProvider>
	</React.StrictMode>
);
