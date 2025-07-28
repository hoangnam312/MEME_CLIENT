import { Route, Routes } from 'react-router';
import { BoardHomepage } from 'src/containers/BoardHomepage/BoardHomepage';
import Layout from 'src/containers/Layout/Layout';
import Login from 'src/containers/Login/Login';
import MyMeme from 'src/containers/MyMeme/MyMeme';
import Account from 'src/containers/Account/Account';
import Register from 'src/containers/Register/Register';
import ForgotPassword from 'src/containers/ForgotPassword/ForgotPassword';
import EmailVerification from 'src/containers/EmailVerification/EmailVerification';
import Trending from 'src/containers/Trending/Trending';
import TrendingUsers from 'src/containers/TrendingUsers/TrendingUsers';

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<BoardHomepage />} />
				<Route path="my-meme" element={<MyMeme />} />
				<Route path="trending" element={<Trending />} />
				<Route path="trending-users" element={<TrendingUsers />} />
				<Route path="account" element={<Account />} />
			</Route>

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/verify-email" element={<EmailVerification />} />

			<Route path="*" element={<div>Error Page</div>} />
		</Routes>
	);
};

export default AppRoutes;
