import i18next from 'src/i18n/i18next.config';
import { MNavbar } from './component/molecules/MNavbar/MNavbar';
import fakeImage from './fakeData/dataImage';
import { OBoard } from './component/organisms/OBoard/OBoard';

function App() {
	return (
		<>
			<MNavbar />
			<div>
				<p className="bg-main-background text-main-color">
					App {i18next.t('hello')}
				</p>
				<div className="m-5">
					<OBoard imageArray={fakeImage} />
				</div>
			</div>
		</>
	);
}

export default App;
