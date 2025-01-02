import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faHashtag, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import AModal from 'src/component/atoms/AModal/AModal';
import { color } from 'src/config/style';
import { IImage, StatusCopyImage } from 'src/constants/type';
import useCopyImage from 'src/hooks/useCopy';

const baseImage = import.meta.env.VITE_BASE_IMAGE;

export interface OViewImagePropsType {
	isOpen: boolean;
	data: IImage;
	closeModal: () => void;
	onSelectImage: () => void;
}

const OViewImage = ({
	isOpen,
	data,
	closeModal,
	onSelectImage,
}: OViewImagePropsType) => {
	const inputFile = useRef<HTMLInputElement>(null);
	const [name, setName] = useState('');
	const [tag, setTag] = useState('');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isCopiedImage, setIsCopiedImage] = useState<StatusCopyImage>(
		StatusCopyImage.UN_COPY
	);
	const [isCopiedLink, setIsCopiedLink] = useState<StatusCopyImage>(
		StatusCopyImage.UN_COPY
	);
	const { copyImage, copyLink } = useCopyImage();

	const onPreHandleImage = () => {
		// !TODO: handle data to image
		onSelectImage();
	};

	useEffect(() => {
		setName(data?.name || '');
		setTag(data?.tag);
		setIsEdit(false);
	}, [isOpen, data]);

	async function handleCopyImage() {
		const awaitCopy = await copyImage(baseImage + data.imagePath);
		if (awaitCopy) setIsCopiedImage(StatusCopyImage.SUCCESS);
		else setIsCopiedImage(StatusCopyImage.FAIL);
		setTimeout(() => {
			setIsCopiedImage(StatusCopyImage.UN_COPY);
		}, 3000);
	}

	async function handleCopyLink() {
		const awaitCopy = await copyLink(baseImage + data.imagePath);
		if (awaitCopy) setIsCopiedLink(StatusCopyImage.SUCCESS);
		else setIsCopiedLink(StatusCopyImage.FAIL);
		setTimeout(() => {
			setIsCopiedLink(StatusCopyImage.UN_COPY);
		}, 3000);
	}

	function renderBtnCopyImage() {
		switch (isCopiedImage) {
			case StatusCopyImage.SUCCESS:
				return t('copy.success');
			case StatusCopyImage.FAIL:
				return t('copy.fail');
			default:
				return t('copy');
		}
	}

	function renderBtnCopyLink() {
		switch (isCopiedLink) {
			case StatusCopyImage.SUCCESS:
				return t('copyLink.success');
			case StatusCopyImage.FAIL:
				return t('copyLink.fail');
			default:
				return t('copyLink');
		}
	}

	const handleUpload = () => {
		if (data?.imagePath) return;
		inputFile?.current?.click();
	};

	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-1/2">
			<div className="relative">
				<div
					className="my-10 flex items-center justify-center rounded-lg text-5xl"
					onClick={handleUpload}
				>
					{data?.imagePath ? (
						<img
							src={baseImage + data.imagePath}
							alt={data.imagePath}
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
				<div className="flex justify-end self-center">
					<AButton onClick={handleCopyImage}>{renderBtnCopyImage()}</AButton>
					<AButton addClass="ml-5" onClick={handleCopyLink}>
						{renderBtnCopyLink()}
					</AButton>
				</div>
				{isEdit ? (
					<>
						<AInput
							addClassWrapper="mt-3"
							icon={<FontAwesomeIcon icon={faPen} />}
							rest={{
								value: name,
								placeholder: t('UploadModal.name'),
								onChange: (e: ChangeEvent<HTMLInputElement>) =>
									setName(e.target.value),
							}}
						/>
						<AInput
							addClassWrapper="mt-3"
							icon={<FontAwesomeIcon icon={faHashtag} />}
							rest={{
								value: tag,
								placeholder: t('UploadModal.name'),
								onChange: (e: ChangeEvent<HTMLInputElement>) =>
									setTag(e.target.value),
							}}
						/>
					</>
				) : (
					<div className="mt-5">
						<div className="rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10">
							<p onClick={() => setIsEdit(true)}>
								{data?.name ? data.name : t('noName')}
							</p>
						</div>
						<div className="mt-5 rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10">
							<p onClick={() => setIsEdit(true)}>
								{data?.tag ? data.tag : t('noTag')}
							</p>
						</div>
					</div>
				)}

				<div className="mt-5 flex justify-center self-center">
					<AButton>{t('save')}</AButton>
					{/* !TODO: handle image here */}
				</div>
				{/* <div className="mt-3 flex justify-end self-center">
					<div className="w-3/5">
						<p className="text-right text-sm italic text-gray-500">
							{t('saveLink.explant')}
						</p>
					</div>
				</div> */}
			</div>
			<input
				ref={inputFile}
				type="file"
				className="hidden"
				onChange={onPreHandleImage}
			/>
		</AModal>
	);
};

export default OViewImage;
