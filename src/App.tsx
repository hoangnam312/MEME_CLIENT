import i18next from 'src/i18n/i18next.config';
import ASearch from './component/atoms/ASearch/ASearch';

function App() {
	return (
		<div>
			<p className="text-main-color bg-main-background">
				App {i18next.t('hello')}
				<ASearch />
			</p>
		</div>
	);
}

export default App;
