import { faHashtag, faPen, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import AButton from 'src/component/atoms/AButton/AButton';
import AInput from 'src/component/atoms/AInput/AInput';
import AModal from 'src/component/atoms/AModal/AModal';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import { color } from 'src/config/style';
import useFile from 'src/hooks/useFile';

export interface OUploadModalPropsType {
	isOpen: boolean;
	closeModal: () => void;
	onSelectImage: () => void;
}

const OUploadModal = ({ isOpen, closeModal }: OUploadModalPropsType) => {
	const inputFile = useRef();
	const [name, setName] = useState('');
	const [tag, setTag] = useState('');
	const [link, setLink] = useState('');
	const [isImageError, setIsImageError] = useState<boolean>(false);
	const { source, onPaste, onDrop, onDragOverAble, onUpload, setSource } =
		useFile();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onPreHandleImage = (e: unknown) => {
		// !TODO: handle data to image
		// onSelectImage();
	};

	useEffect(() => {
		setName('');
		setTag('');
		setLink('');
		setSource('');
	}, [isOpen, setSource]);

	const onUpdateLink = (e: React.FormEvent<HTMLFormElement>, value: string) => {
		setLink(value);
		setSource('');
	};

	const onImageError = () => {
		setIsImageError(true);
	};

	useEffect(() => {
		setIsImageError(false);
	}, [source]);

	return (
		<AModal isOpen={isOpen} closeModal={closeModal} addClassWrap="!w-1/2">
			<div className="relative">
				<h3 className="p-3 text-center text-xl font-bold text-main-color">
					{t('QuickUpload.dragHere')}
				</h3>
				{(source || link) && !isImageError ? (
					<div className="my-10" onDrop={onDrop} onDragOver={onDragOverAble}>
						<img
							src={source || link}
							alt="meme preview"
							onError={onImageError}
						/>
					</div>
				) : (
					<div
						className="my-10 flex items-center justify-center rounded-lg border-2 border-dashed border-main-color bg-gray-100 pb-8 pt-14 text-5xl"
						onClick={() => inputFile?.current.click()}
						onDragOver={onDragOverAble}
						onDrop={onDrop}
					>
						<FontAwesomeIcon
							icon={faUpload}
							bounce
							size="2xl"
							style={{ color: color.main }}
						/>
					</div>
				)}
				<ASearch
					placeholder={t('QuickUpload.pastHere')}
					onSubmit={onUpdateLink}
					rest={{
						onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => onPaste(e),
						onDrop: onDrop,
					}}
				/>
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
				<div className="mt-5 flex justify-center self-center">
					<AButton>{t('save')}</AButton>
					{/* !TODO: handle image here */}
					<AButton addClass={'ml-4'}>{t('saveLink')}</AButton>
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
				onChange={onUpload}
			/>
		</AModal>
	);
};

export default OUploadModal;
