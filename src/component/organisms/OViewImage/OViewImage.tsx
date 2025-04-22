import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AModal from 'src/component/atoms/AModal/AModal';
import { color } from 'src/config/style';
import { IImage, StatusCopyImage } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import useCopyImage from 'src/hooks/useCopy';
import { deleteMeme, trackingMeme } from 'src/service/meme';

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

	const { copyImage } = useCopyImage();

	async function handleCopyImage() {
		const awaitCopy = await copyImage(data.location);
		if (awaitCopy) {
			setIsCopiedImage(StatusCopyImage.SUCCESS);
			trackingMeme({
				memeId: data._id,
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
		await deleteMeme({ id: data._id });
		closeModal();
	}

	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-1/2">
			<div className="relative">
				<div className="mb-3 mt-10 flex items-center justify-center rounded-lg text-5xl">
					{data?.location ? (
						<img
							src={data.location}
							alt={data.location}
							className="max-h-96 max-w-2xl"
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
					{userId === data?.userId && (
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
					<h2 className="mb-2 text-3xl">{data?.name ?? t('noName')}</h2>
					<p>{data?.description}</p>
					<p>{data?.tag}</p>
				</div>
			</div>
		</AModal>
	);
};

export default OViewImage;
