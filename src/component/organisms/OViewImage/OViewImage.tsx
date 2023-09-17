import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faHashtag, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import AModal from 'src/component/atoms/AModal/AModal';
import { color } from 'src/config/style';
import { IImage } from 'src/constants/type';

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
	const inputFile = useRef();
	const [name, setName] = useState('');
	const [tag, setTag] = useState('');
	const [isEdit, setIsEdit] = useState<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onPreHandleImage = (e: unknown) => {
		// !TODO: handle data to image
		onSelectImage();
	};

	useEffect(() => {
		setName(data?.name || '');
		setTag(data?.tag);
		setIsEdit(false);
	}, [isOpen, data]);

	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-1/2">
			<div className="relative">
				<div
					className="my-10 flex items-center justify-center rounded-lg text-5xl"
					onClick={() => inputFile?.current.click()}
				>
					{data?.imagePath ? (
						<img
							src={data.imagePath}
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
					<AButton>{t('copy')}</AButton>
					<AButton addClass="ml-5">{t('copyLink')}</AButton>
				</div>
				{isEdit ? (
					<>
						<AInput
							placeholder={t('UploadModal.name')}
							addClassWrapper="mt-3"
							onChange={(e) => setName(e.target.value)}
							icon={<FontAwesomeIcon icon={faPen} />}
							rest={{
								value: name,
							}}
						/>
						<AInput
							placeholder={t('UploadModal.tag')}
							addClassWrapper="mt-3"
							onChange={(e) => setTag(e.target.value)}
							icon={<FontAwesomeIcon icon={faHashtag} />}
							rest={{
								value: tag,
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
				<div className="mt-3 flex justify-end self-center">
					<div className="w-3/5">
						<p className="text-right text-sm italic text-gray-500">
							{t('saveLink.explant')}
						</p>
					</div>
				</div>
			</div>
			<input
				ref={inputFile}
				type="file"
				className="hidden"
				onChange={(e) => onPreHandleImage(e)}
			/>
		</AModal>
	);
};

export default OViewImage;
