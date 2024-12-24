import { Route, Routes } from 'react-router';
import { BoardHomepage } from 'src/containers/BoardHomepage/BoardHomepage';
import Layout from 'src/containers/Layout/Layout';
import Login from 'src/containers/Login/Login';
import MyMeme from 'src/containers/MyMeme/MyMeme';
import Register from 'src/containers/Register/Register';

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<BoardHomepage />} />
				<Route path="my-meme" element={<MyMeme />} />
			</Route>

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route path="*" element={<div>Error Page</div>} />
		</Routes>
	);
};

export default AppRoutes;
