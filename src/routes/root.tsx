import { Route, Routes } from 'react-router';
import { BoardHomepage } from 'src/containers/BoardHomepage/BoardHomepage';
import Layout from 'src/containers/Layout/Layout';
import Login from 'src/containers/Login/Login';
import MyMeme from 'src/containers/MyMeme/MyMeme';
import Account from 'src/containers/Account/Account';
import Register from 'src/containers/Register/Register';
import EmailVerification from 'src/containers/EmailVerification/EmailVerification';
import Trending from 'src/containers/Trending/Trending';
import TrendingUsers from 'src/containers/TrendingUsers/TrendingUsers';
import ForgotPassword from 'src/containers/ForgotPassword/ForgotPassword';
import PrivacyPolicy from 'src/containers/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from 'src/containers/TermsOfService/TermsOfService';
import DataDeletionGuide from 'src/containers/DataDeletionGuide/DataDeletionGuide';
import BulkUpload from 'src/containers/BulkUpload/BulkUpload';
import ContactUs from 'src/containers/ContactUs/ContactUs';

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<BoardHomepage />} />
				<Route path="my-meme" element={<MyMeme />} />
				<Route path="bulk-upload" element={<BulkUpload />} />
				<Route path="bulk-upload/:uploadId" element={<BulkUpload />} />
				<Route path="trending" element={<Trending />} />
				<Route path="trending-users" element={<TrendingUsers />} />
				<Route path="account" element={<Account />} />
			</Route>

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/verify-email" element={<EmailVerification />} />
			<Route path="/privacy-policy" element={<PrivacyPolicy />} />
			<Route path="/terms-of-service" element={<TermsOfService />} />
			<Route path="/data-deletion-guide" element={<DataDeletionGuide />} />
			<Route path="/contact-us" element={<ContactUs />} />

			<Route path="*" element={<div>Error Page</div>} />
		</Routes>
	);
};

export default AppRoutes;
