import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MyMeme from 'src/containers/MyMeme/MyMeme';
import Login from 'src/containers/Login/Login';
import Register from 'src/containers/Register/Register';
import { Path } from 'src/constants/type';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>Error Page</div>,
		children: [
			{
				path: Path.MY_MEME,
				element: <MyMeme />,
				children: [],
			},
		],
	},
	{
		path: Path.LOGIN,
		element: <Login />,
	},
	{
		path: Path.REGISTER,
		element: <Register />,
	},
]);
