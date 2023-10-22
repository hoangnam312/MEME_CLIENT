import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MyMeme from 'src/containers/MyMeme/MyMeme';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>Error Page</div>,
		children: [
			{
				path: 'child',
				element: <div>Child Route</div>,
			},
		],
	},
	{
		path: '/my-meme',
		element: <MyMeme />,
		children: [],
	},
]);
