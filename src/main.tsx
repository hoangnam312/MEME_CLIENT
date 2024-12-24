import React from 'react';

import { scan } from 'react-scan';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import ReactDOM from 'react-dom/client';

import AppRoutes from './routes/root.tsx';

import 'src/assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';

// React scan for dev. Ref: https://github.com/aidenybai/react-scan
scan({
	enabled: true,
	log: false, // logs render info to console (default: false)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
		<ToastContainer />
	</React.StrictMode>
);
