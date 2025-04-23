import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AModal from 'src/component/atoms/AModal/AModal';
import { color } from 'src/config/style';
import { IImage, StatusCopyImage } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import useCopyImage from 'src/hooks/useCopy';
import {
	deleteMeme,
	getRecommendMemesByImage,
	trackingMeme,
} from 'src/service/meme';
import { OCardImage } from '../OCardImage/OCardImage';

export interface OViewImagePropsType {
	isOpen: boolean;
	data: IImage;
	closeModal: () => void;
}

const OViewImage = ({ isOpen, data, closeModal }: OViewImagePropsType) => {
	const { userId } = useAuthen();
	const [isCopiedImage, setIsCopiedImage] = useState<StatusCopyImage>(
		StatusCopyImage.UN_COPY
	);
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [dataImage, setDataImage] = useState<IImage>(data);

	const fetchMemes = async (imageId: string) => {
		const res = await getRecommendMemesByImage({
			limit: 20,
			imageId,
		});
		if (res?.data) {
			setListImage([...(res?.data?.data ?? [])]);
		}
	};

	const { copyImage } = useCopyImage();

	async function handleCopyImage() {
		const awaitCopy = await copyImage(dataImage.location);
		if (awaitCopy) {
			setIsCopiedImage(StatusCopyImage.SUCCESS);
			trackingMeme({
				memeId: dataImage._id,
				action: 'copy',
			});
		} else setIsCopiedImage(StatusCopyImage.FAIL);
		setTimeout(() => {
			setIsCopiedImage(StatusCopyImage.UN_COPY);
		}, 3000);
	}

	function renderBtnCopyImage() {
		switch (isCopiedImage) {
			case StatusCopyImage.SUCCESS:
				return t('copy.success');
			case StatusCopyImage.FAIL:
				return t('copy.fail');
			default:
				return (
					<>
						{t('copy')} &nbsp;
						<FontAwesomeIcon icon={faCopy} />
					</>
				);
		}
	}

	async function handleDeleteImage() {
		await deleteMeme({ id: dataImage._id });
		closeModal();
	}

	const handleClick = (item: IImage) => {
		trackingMeme({
			memeId: item._id,
			action: 'view',
		});
		const newData = listImage.find((image) => image._id === item._id);
		if (newData) {
			setDataImage(newData);
		}
	};

	useEffect(() => {
		setDataImage(data);
	}, [data]);

	useEffect(() => {
		fetchMemes(dataImage?._id);
	}, [dataImage]);

	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-2/3">
			<div className="grid grid-cols-3 gap-4">
				<div className="relative col-span-2">
					<div className="mb-3 mt-10 flex items-center justify-center rounded-lg text-5xl">
						{dataImage?.imageMedium ? (
							<img
								src={dataImage.imageMedium}
								alt={dataImage.imageMedium}
								className="max-xl max-h-96"
							/>
						) : (
							<FontAwesomeIcon
								icon={faImage}
								bounce
								size="2xl"
								style={{ color: color.main }}
							/>
						)}
					</div>
					<div className="flex justify-end gap-4 self-center">
						{userId === dataImage?.userId && (
							<AButton
								addClass="bg-red-500 text-white"
								onClick={handleDeleteImage}
							>
								{t('delete')} &nbsp;
								<FontAwesomeIcon icon={faTrashCan} />
							</AButton>
						)}
						<AButton onClick={handleCopyImage}>{renderBtnCopyImage()}</AButton>
					</div>

					<div className="ml-5 mt-5">
						<h2 className="mb-2 text-3xl">{dataImage?.name ?? t('noName')}</h2>
						<p>{dataImage?.description}</p>
						<p>{dataImage?.tag}</p>
					</div>
				</div>
				<div className="rounded-lg border bg-gray-200">
					<div className="mx-auto max-w-md p-4">
						<div className="max-h-[35rem] space-y-4 overflow-y-auto">
							{listImage?.map((item) => (
								<OCardImage
									key={item._id}
									data={item}
									addClassImage={'w-full'}
									onClick={() => handleClick(item)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</AModal>
	);
};

export default OViewImage;
