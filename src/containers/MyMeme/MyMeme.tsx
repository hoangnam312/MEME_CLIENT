import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import dataMyImage from 'src/fakeData/dataMyImage';
import i18next from 'src/i18n/i18next.config';
import QuickUploadWrapper from '../QuickUploadWrapper/QuickUploadWrapper';
import { MNavbar } from 'src/component/molecules/MNavbar/MNavbar';

function MyMeme() {
	return (
		<QuickUploadWrapper>
			<MNavbar />

			<div>
				<p className="bg-main-background text-main-color">
					MyMeme {i18next.t('hello')}
				</p>
				<div className="m-5">
					<OBoard imageArray={dataMyImage} />
				</div>
			</div>
		</QuickUploadWrapper>
	);
}

export default MyMeme;
