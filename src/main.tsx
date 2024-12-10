import React from 'react';

import { scan } from 'react-scan';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import { router } from './routes/root.tsx';

import 'src/assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';

// React scan for dev. Ref: https://github.com/aidenybai/react-scan
scan({
	enabled: true,
	log: true, // logs render info to console (default: false)
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<ToastContainer />
	</React.StrictMode>
);
