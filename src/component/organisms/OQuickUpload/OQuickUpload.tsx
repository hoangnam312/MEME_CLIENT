import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import AModal from 'src/component/atoms/AModal/AModal';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import { color } from 'src/config/style';
import useFile from 'src/hooks/useFile';

export interface OQuickUploadPropsType {
	isOpen: boolean;
	closeModal: () => void;
	onSelectImage: () => void;
}

const OQuickUpload = ({
	isOpen,
	closeModal,
	onSelectImage,
}: OQuickUploadPropsType) => {
	const inputFile = useRef();
	const [isImageError, setIsImageError] = useState<boolean>(false);
	const { source, onPaste, onDrop, onDragOverAble, onUpload, setSource } =
		useFile();
	const [link, setLink] = useState<string>('');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onPreHandleImage = (e: React.FormEvent<HTMLFormElement>) => {
		// !TODO: handle data to image, when user upload image and it's valid call this function now
		// this mission of component is where to drop image. that's it.
		console.log('onPreHandleImage', source);
		onSelectImage();
	};

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
		<AModal isOpen={isOpen} closeModal={closeModal}>
			<div className="relative">
				<h3 className="p-3 text-center text-xl font-bold text-main-color">
					{t('QuickUpload.dragHere')}
				</h3>
				{(source || link) && !isImageError ? (
					<div className="my-10" onDrop={onDrop} onDragOver={onDragOverAble}>
						<img src={source} alt="meme preview" onError={onImageError} />
					</div>
				) : (
					<div
						className="my-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-main-color bg-gray-100 pb-8 pt-14 text-5xl"
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
						{isImageError && (
							<p className="mt-5 text-center text-base text-gray-500">
								{t('upload.link.error')}
							</p>
						)}
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
			</div>
			<input
				ref={inputFile}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={onUpload}
			/>
		</AModal>
	);
};

export default OQuickUpload;
