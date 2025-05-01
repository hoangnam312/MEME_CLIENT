import { useEffect, useRef, useState } from 'react';

import { t } from 'i18next';

import useFile from 'src/hooks/useFile';
import { color } from 'src/config/style';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormUpload, { TInputs } from './FormUpload';
import { createMeme } from 'src/service/meme';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse } from 'src/constants/type';
import AButton from 'src/component/atoms/AButton/AButton';
import OBlurRequiredAuthen from '../OBlurRequiredAuthen/OBlurRequiredAuthen';

export interface OUploadImagePropsType {
	closeModal: () => void;
}

const ToastUploadSuccess = () => {
	const handleCopy = () => {
		// !TODO: copy image by id
	};

	return (
		<div className="ms-3">
			<p>{t('upload.success')}</p>
			<div className="mt-1">
				<AButton onClick={handleCopy}>{t('copy')}</AButton>
			</div>
		</div>
	);
};

const UploadImage = ({ closeModal }: OUploadImagePropsType) => {
	const inputFile = useRef<HTMLInputElement>(null);
	const [link, setLink] = useState('');
	const [isImageError, setIsImageError] = useState<boolean>(true);
	const {
		source,
		file,
		onPaste,
		onDrop,
		onDragOverAble,
		onUpload,
		clearSource,
		clearFile,
	} = useFile();

	const onUpdateLink = (
		_e: React.FormEvent<HTMLFormElement>,
		value: string
	) => {
		setLink(value);
		clearSource();
		clearFile();
	};

	const onImageError = () => {
		setIsImageError(true);
	};

	const handleSave = async (data: TInputs) => {
		const memeFormData = new FormData();

		for (const [key, value] of Object.entries(data)) {
			console.log(key, value);
			memeFormData.append(key, value);
		}
		if (source && file) memeFormData.append('image', file);
		if (link) {
			try {
				const imageFromLink = await fetch(link);
				const blob = await imageFromLink.blob();
				memeFormData.append('image', blob);
			} catch (error) {
				toast.error(t('toast.cannotGetImageFromLink'));
				setIsImageError(true);
				return;
			}
		}

		for (const value of memeFormData.values()) {
			console.log(value);
		}
		createMeme(memeFormData)
			.then(() => {
				closeModal();
				toast.success(ToastUploadSuccess);
			})
			.catch((error: AxiosError<ErrorResponse>) =>
				toast.error(error.response?.data.message ?? t('toast.unexpectedError'))
			);
	};

	useEffect(() => {
		if (source || link) setIsImageError(false);
	}, [source, link]);

	useEffect(() => {
		if (source) setLink('');
	}, [source]);

	return (
		<div>
			{(source || link) && !isImageError ? (
				<div
					className="my-10 flex justify-center"
					onDrop={onDrop}
					onDragOver={onDragOverAble}
				>
					<img src={source || link} alt="meme preview" onError={onImageError} />
				</div>
			) : (
				<div
					className="my-10 flex items-center justify-center rounded-lg border-2 border-dashed border-main-color bg-gray-100 pb-8 pt-14 text-5xl"
					onClick={() => inputFile?.current?.click()}
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
			<input
				ref={inputFile}
				type="file"
				className="hidden"
				onChange={onUpload}
			/>

			<ASearch
				placeholder={t('QuickUpload.pastHere')}
				value={link}
				onSubmit={onUpdateLink}
				rest={{
					onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => onPaste(e),
					onDrop: onDrop,
				}}
			/>

			{(source || link) && (
				<OBlurRequiredAuthen>
					<FormUpload
						isDisabledButtonSave={isImageError}
						handleSave={handleSave}
					/>
				</OBlurRequiredAuthen>
			)}
		</div>
	);
};

export default UploadImage;
