import i18next from 'src/i18n/i18next.config';
import ASearch from './component/atoms/ASearch/ASearch';
import { MNavbar } from './component/molecules/MNavbar/MNavbar';

function App() {
	return (
		<>
			<MNavbar />
			<div>
				<p className="bg-main-background text-main-color">
					App {i18next.t('hello')}
					<ASearch />
				</p>
			</div>
		</>
	);
}

export default App;
