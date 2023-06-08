import { OCardImage } from '../OCardImage/OCardImage';
import { IImage } from 'src/constants/type';

export interface OBoardPropsType {
	imageArray: IImage[];
	addClass?: string;
	addClassWrapperImage?: string;
}

export const OBoard = ({
	imageArray,
	addClass = 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6',
	addClassWrapperImage = 'mb-4',
}: OBoardPropsType) => {
	return (
		<div className={addClass}>
			{imageArray.map((item, index) => (
				<OCardImage
					key={index}
					imagePath={item.imagePath}
					addClassWrapper={addClassWrapperImage}
				/>
			))}
		</div>
	);
};
