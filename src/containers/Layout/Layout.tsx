import { Outlet } from 'react-router';

import useCheckModalOpening from 'src/hooks/useCheckModalOpening';
import { MNavbar } from 'src/component/molecules/MNavbar/MNavbar';

import QuickUploadWrapper from '../QuickUploadWrapper/QuickUploadWrapper';

const Layout = () => {
	const { modalOpening, updateModalOpening } = useCheckModalOpening();

	return (
		<QuickUploadWrapper
			modalOpening={modalOpening}
			updateModalOpening={updateModalOpening}
		>
			<MNavbar updateModalOpening={updateModalOpening} />

			<div>
				<div className="m-5">
					<Outlet />
				</div>
			</div>
		</QuickUploadWrapper>
	);
};

export default Layout;
