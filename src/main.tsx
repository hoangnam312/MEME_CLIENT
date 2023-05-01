import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/root.tsx';
import { RouterProvider } from 'react-router-dom';
import 'src/assets/css/main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
