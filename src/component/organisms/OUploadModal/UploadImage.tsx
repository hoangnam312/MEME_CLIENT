import { useEffect, useRef, useState } from 'react';

import { t } from 'i18next';

import useFile from 'src/hooks/useFile';
import { color } from 'src/config/style';
import ASearch from 'src/component/atoms/ASearch/ASearch';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormUpload, { TInputs } from './FormUpload';
import { createMeme, ESourceType } from 'src/service/meme';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorResponse, IMeme } from 'src/constants/type';
import OBlurRequiredAuthen from '../OBlurRequiredAuthen/OBlurRequiredAuthen';
import MemeCopyButton from 'src/component/molecules/MMemeCopyButton/MemeCopyButton';
import { useAuthen } from 'src/hooks/useAuthen';

export interface OUploadImagePropsType {
	closeModal: () => void;
}

const ToastUploadSuccess = ({
	meme,
	enableWatermark,
}: {
	meme: IMeme;
	enableWatermark?: boolean;
}) => {
	return (
		<div className="ms-3 flex items-center justify-between">
			<p className="mr-1">{t('upload.success')}</p>
			<MemeCopyButton
				data={meme}
				sourceType={ESourceType.Other}
				enableWatermark={enableWatermark}
			/>
		</div>
	);
};

const UploadImage = ({ closeModal }: OUploadImagePropsType) => {
	const inputFile = useRef<HTMLInputElement>(null);
	const [link, setLink] = useState('');
	const [isImageError, setIsImageError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(false);
	const { preferences } = useAuthen();
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

	const handleSave = async (data: TInputs) => {
		if (isLoading) return;
		setIsLoading(true);
		const memeFormData = new FormData();

		for (const [key, value] of Object.entries(data)) {
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
				setIsLoading(false);
				return;
			}
		}

		createMeme(memeFormData)
			.then((response) => {
				closeModal();
				const createdMeme = response.data;
				if (createdMeme) {
					toast.success(() => (
						<ToastUploadSuccess
							meme={createdMeme}
							enableWatermark={preferences.enableWatermark ?? true}
						/>
					));
				} else {
					toast.success(t('upload.success'));
				}
			})
			.catch((error: AxiosError<ErrorResponse>) =>
				toast.error(error.response?.data.message ?? t('toast.unexpectedError'))
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		if (source || link) setIsImageError(false);
	}, [source, link]);

	useEffect(() => {
		if (source) setLink('');
	}, [source]);

	return (
		<div>
			<div className="my-4 md:my-10">
				{(source || link) && !isImageError ? (
					<div
						className="flex justify-center"
						onDrop={onDrop}
						onDragOver={onDragOverAble}
					>
						<img
							src={source || link}
							alt="meme preview"
							className="max-h-[40vh] w-auto max-w-full rounded-lg object-contain md:max-h-[50vh] lg:max-h-[60vh]"
							onError={() => {
								setIsImageError(true);
								console.log('error');
							}}
							onLoad={() => {
								setIsImageError(false);
								console.log('load');
							}}
						/>
					</div>
				) : (
					<div
						className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-main-color bg-gray-100 py-12 text-4xl transition-colors hover:bg-gray-200 md:pb-8 md:pt-14 md:text-5xl"
						onClick={() => inputFile?.current?.click()}
						onDragOver={onDragOverAble}
						onDrop={onDrop}
					>
						<div className="flex flex-col items-center gap-3">
							<FontAwesomeIcon
								icon={faUpload}
								bounce
								size="2xl"
								style={{ color: color.main }}
							/>
							<p className="hidden text-sm text-gray-600 md:block md:text-base">
								{t('QuickUpload.dragHere')}
							</p>
						</div>
					</div>
				)}
				{isImageError && (
					<p className="mt-2 px-2 text-center text-sm font-semibold text-red-500 md:text-base">
						{t('toast.cannotGetImageFromLink')}
					</p>
				)}
			</div>

			<input
				ref={inputFile}
				type="file"
				className="hidden"
				onChange={onUpload}
			/>

			{(!source || isImageError) && (
				<ASearch
					placeholder={t('QuickUpload.pastHere')}
					value={link}
					onSubmit={onUpdateLink}
					rest={{
						onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => onPaste(e),
						onDrop: onDrop,
					}}
				/>
			)}

			{(source || link) && (
				<OBlurRequiredAuthen>
					<FormUpload
						isDisabledButtonSave={isImageError}
						handleSave={handleSave}
						isLoading={isLoading}
					/>
				</OBlurRequiredAuthen>
			)}
		</div>
	);
};

export default UploadImage;
