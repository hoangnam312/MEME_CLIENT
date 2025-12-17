import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import AModal from 'src/component/atoms/AModal/AModal';
import MemeCopyButton from 'src/component/molecules/MMemeCopyButton/MemeCopyButton';
import MemeDislikeButton from 'src/component/molecules/MMemeDislikeButton/MemeDislikeButton';
import MemeLikeButton from 'src/component/molecules/MMemeLikeButton/MemeLikeButton';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { color } from 'src/config/style';
import { IMeme } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import {
	ESourceType,
	getRecommendMemesByImage,
	trackingMeme,
} from 'src/service/meme';
import { addMemeIdToUrl, removeMemeIdFromUrl } from 'src/utils/memeViewUtils';
import { OCardImage } from '../OCardImage/OCardImage';

export interface OViewImagePropsType {
	isOpen: boolean;
	data: IMeme;
	closeModal: () => void;
}

const OViewImage = ({ isOpen, data, closeModal }: OViewImagePropsType) => {
	const { isLoggedIn, preferences } = useAuthen();
	const [listImage, setListImage] = useState<IMeme[]>([]);
	const [dataImage, setDataImage] = useState<IMeme>(data);

	const handleCloseModal = () => {
		removeMemeIdFromUrl();
		setDataImage(data);
		setListImage([]);
		closeModal();
	};

	// change to get creator data from data prop
	const creatorData = dataImage?.creator
		? {
				id: dataImage.creator._id,
				avatarUrl: dataImage.creator.avatarUrl || '',
				username: dataImage.creator.username,
				displayName:
					dataImage.creator.displayName || dataImage.creator.username,
				followCount: dataImage.creator.followCount,
				followingCount: dataImage.creator.followingCount,
				bio: '',
		  }
		: null;

	const fetchMemes = async (imageId: string) => {
		const res = await getRecommendMemesByImage({
			limit: 20,
			imageId,
		});
		if (res?.data) {
			setListImage([...(res?.data?.data ?? [])]);
		}
	};

	// async function handleDeleteImage() {
	// 	await deleteMeme({ id: dataImage._id });
	// 	closeModal();
	// }

	const handleClick = (item: IMeme) => {
		trackingMeme(
			{
				memeId: item._id,
				action: 'view',
			},
			{
				sourceType: ESourceType.Detail,
			}
		);
		const newData = listImage.find((image) => image._id === item._id);
		if (newData) {
			setDataImage(newData);
			addMemeIdToUrl(newData._id);
		}
	};

	useEffect(() => {
		setDataImage(data);
	}, [data]);

	useEffect(() => {
		fetchMemes(dataImage?._id);
	}, [dataImage]);

	// Update URL when modal opens with initial data
	useEffect(() => {
		if (isOpen && dataImage?._id) {
			addMemeIdToUrl(dataImage._id);
		}
	}, [isOpen, dataImage?._id]);

	// Breakpoint columns for masonry layout (mobile/tablet only)
	const breakpointColumns = {
		default: 2, // For tablet (md)
		640: 1, // For mobile (sm and below)
	};

	return (
		<AModal
			isOpen={isOpen}
			closeModal={handleCloseModal}
			addClassWrap="!w-8/12 lg:!w-2/3 lg:!max-w-6xl overflow-y-auto lg:overflow-visible max-h-[90vh] lg:max-h-unset"
		>
			<div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-4">
				<div className="relative col-span-1 lg:col-span-2">
					<div className="mlg:mt-10 mb-3 mt-2 flex items-center justify-center rounded-lg text-5xl">
						{dataImage?.image.imageMedium ? (
							<img
								src={dataImage.image.imageMedium}
								alt={dataImage.image.imageMedium}
								className="max-h-[50vh] max-w-full object-contain md:max-h-[60vh] lg:max-h-96"
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

					<div className="flex justify-between gap-2 lg:flex-row lg:gap-0">
						<div className="flex justify-center gap-2 self-center md:justify-start md:gap-4">
							{isLoggedIn() && (
								<>
									<div className="scale-90 md:scale-100">
										<MemeLikeButton
											data={dataImage}
											sourceType={ESourceType.Detail}
										/>
									</div>
									<div className="scale-90 md:scale-100">
										<MemeDislikeButton
											data={dataImage}
											sourceType={ESourceType.Detail}
										/>
									</div>
									{/* disabled album */}
									{/* <MemeAlbumButton
										data={dataImage}
										sourceType={ESourceType.Detail}
									/> */}
								</>
							)}
						</div>
						<div className="flex justify-center gap-2 self-center md:justify-end md:gap-4">
							{/* {userId === dataImage?.userId && (
							<AButton
								addClass="bg-red-500 text-white"
								onClick={handleDeleteImage}
							>
								{t('delete')} &nbsp;
								<FontAwesomeIcon icon={faTrashCan} />
							</AButton>
						)} */}
							<div className="scale-90 md:scale-100">
								<MemeCopyButton
									data={dataImage}
									sourceType={ESourceType.Detail}
									enableWatermark={preferences.enableWatermark ?? true}
								/>
							</div>
						</div>
					</div>

					<div className="mt-3 rounded-2xl bg-gray-100 p-2 md:mt-5 md:p-3">
						{/* Combined stats and account info in horizontal row */}
						<div className="flex items-center justify-between gap-3 md:gap-0">
							{/* Stats on the left */}
							<div className="flex items-center gap-4 text-xs text-gray-500 md:gap-6 md:text-sm">
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faEye} size="sm" />
									{dataImage?.stats.viewCount || 0}
								</span>
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faThumbsUp} size="sm" />
									{dataImage?.stats.likeCount || 0}
								</span>
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faCopy} size="sm" />
									{dataImage?.stats.copyCount || 0}
								</span>
							</div>

							{/* Account info on the right */}
							{creatorData && (
								<div className="w-fit">
									<MUserCard
										variant="minimal"
										user={creatorData}
										enableFollowModal={true}
									/>
								</div>
							)}
						</div>

						{dataImage?.name && (
							<h2 className="mt-3 text-lg font-bold text-gray-900 md:mt-4 md:text-2xl">
								{dataImage?.name}
							</h2>
						)}

						{dataImage?.description && (
							<p className="text-sm leading-relaxed text-gray-600 md:text-base">
								{dataImage.description}
							</p>
						)}
					</div>
				</div>
				<div className="rounded-lg border bg-gray-200">
					<div className="mx-auto max-w-md p-2 lg:p-4">
						{/* Mobile / Tablet: Masonry Layout */}
						<div className="max-h-[35rem] overflow-y-auto pb-2 lg:hidden">
							<Masonry
								breakpointCols={breakpointColumns}
								className="-ml-4 flex w-auto"
								columnClassName="pl-4 [background-clip:padding-box] [&>div]:mb-2"
							>
								{listImage?.map((item, index) => (
									<div key={item._id} className="aspect-auto h-auto">
										<OCardImage
											index={index}
											data={item}
											addClassImage={'w-full'}
											onClick={() => handleClick(item)}
										/>
									</div>
								))}
							</Masonry>
						</div>
						{/* Desktop: Vertical Scroll */}
						<div className="hidden max-h-[35rem] space-y-4 overflow-y-auto lg:block">
							{listImage?.map((item, index) => (
								<OCardImage
									key={item._id}
									index={index}
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
