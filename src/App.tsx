import i18next from 'src/i18n/i18next.config';
import { MNavbar } from './component/molecules/MNavbar/MNavbar';
import fakeImage from './fakeData/dataImage';
import { OBoard } from './component/organisms/OBoard/OBoard';
import QuickUploadWrapper from './containers/QuickUploadWrapper/QuickUploadWrapper';
import useCheckModalOpening from './hooks/useCheckModalOpening';

function App() {
	const { modalOpening, updateModalOpening } = useCheckModalOpening();

	return (
		<QuickUploadWrapper
			modalOpening={modalOpening}
			updateModalOpening={updateModalOpening}
		>
			<MNavbar updateModalOpening={updateModalOpening} />

			<div>
				<p className="bg-main-background text-main-color">
					App {i18next.t('hello')}
				</p>
				<div className="m-5">
					<OBoard imageArray={fakeImage} />
				</div>
			</div>
		</QuickUploadWrapper>
	);
}

export default App;
