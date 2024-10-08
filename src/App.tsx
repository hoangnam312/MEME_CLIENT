import { MNavbar } from './component/molecules/MNavbar/MNavbar';
import QuickUploadWrapper from './containers/QuickUploadWrapper/QuickUploadWrapper';
import useCheckModalOpening from './hooks/useCheckModalOpening';
import { BoardHomepage } from './containers/BoardHomepage/BoardHomepage';

function App() {
	const { modalOpening, updateModalOpening } = useCheckModalOpening();

	return (
		<QuickUploadWrapper
			modalOpening={modalOpening}
			updateModalOpening={updateModalOpening}
		>
			<MNavbar updateModalOpening={updateModalOpening} />

			<div>
				<div className="m-5">
					<BoardHomepage />
				</div>
			</div>
		</QuickUploadWrapper>
	);
}

export default App;
