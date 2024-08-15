import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MyMeme from 'src/containers/MyMeme/MyMeme';
import Login from 'src/containers/Login/Login';
import Register from 'src/containers/Login/Register';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>Error Page</div>,
		children: [
			{
				path: '/my-meme',
				element: <MyMeme />,
				children: [],
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);
