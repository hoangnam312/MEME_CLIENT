import { t } from 'i18next';
import { OBoard } from 'src/component/organisms/OBoard/OBoard';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import { IMeme } from 'src/constants/type';

interface MemeListProps {
	memes: IMeme[];
	isLoading: boolean;
	hasNext: boolean;
}

export const MemeList = ({ memes, isLoading, hasNext }: MemeListProps) => {
	return (
		<>
			<OBoard imageArray={memes} />
			{isLoading && (
				<div className="my-3 flex justify-center md:my-4">
					<ALoading isLoading={isLoading} />
				</div>
			)}
			{!hasNext && memes.length > 0 && (
				<div className="my-3 flex justify-center md:my-4">
					<p className="text-xs text-gray-500 md:text-sm">
						{t('BoardHomePage.isEnd')}
					</p>
				</div>
			)}
		</>
	);
};
