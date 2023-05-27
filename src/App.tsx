import i18next from 'src/i18n/i18next.config';
import ASearch from './component/atoms/ASearch/ASearch';
import { MNavbar } from './component/molecules/MNavbar/MNavbar';
import { OCardImage } from './component/organisms/OCardImage/OCardImage';
import fakeImage from './fakeData/dataImage';

function App() {
	return (
		<>
			<MNavbar />
			<div>
				<p className="bg-main-background text-main-color">
					App {i18next.t('hello')}
					<ASearch />
				</p>
				<div className="flex flex-wrap">
					{fakeImage.map((item, index) => (
						<OCardImage
							key={index}
							imagePath={item.imagePath}
							addClassWrapper="m-5 w-1/4 bg-red-200"
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
