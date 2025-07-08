import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faCopy, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AModal from 'src/component/atoms/AModal/AModal';
import MemeAlbumButton from 'src/component/molecules/MMemeAlbumButton/MemeAlbumButton';
import MemeCopyButton from 'src/component/molecules/MMemeCopyButton/MemeCopyButton';
import MemeDislikeButton from 'src/component/molecules/MMemeDislikeButton/MemeDislikeButton';
import MemeLikeButton from 'src/component/molecules/MMemeLikeButton/MemeLikeButton';
import MUserCard from 'src/component/molecules/MUserCard/MUserCard';
import { color } from 'src/config/style';
import { IImage } from 'src/constants/type';
import { useAuthen } from 'src/hooks/useAuthen';
import { getRecommendMemesByImage, trackingMeme } from 'src/service/meme';
import { OCardImage } from '../OCardImage/OCardImage';

export interface OViewImagePropsType {
	isOpen: boolean;
	data: IImage;
	closeModal: () => void;
}

const OViewImage = ({ isOpen, data, closeModal }: OViewImagePropsType) => {
	const { isLoggedIn } = useAuthen();
	const [listImage, setListImage] = useState<IImage[]>([]);
	const [dataImage, setDataImage] = useState<IImage>(data);

	// change to get creator data from data prop
	const creatorData = {
		avatarUrl:
			'https://meme-bucket-001.s3.ap-southeast-2.amazonaws.com/uploads/small/1745418222847_memebetter_com-20240123012602.jpg',
		username: 'Creator Name',
		followCount: 0,
		followingCount: 0,
		bio: '',
	};

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

					<div className="flex justify-between">
						<div className="flex justify-start gap-4 self-center">
							{isLoggedIn() && (
								<>
									<MemeLikeButton data={data} />
									<MemeDislikeButton data={data} />
									<MemeAlbumButton data={data} />
								</>
							)}
						</div>
						<div className="flex justify-end gap-4 self-center">
							{/* {userId === dataImage?.userId && (
							<AButton
								addClass="bg-red-500 text-white"
								onClick={handleDeleteImage}
							>
								{t('delete')} &nbsp;
								<FontAwesomeIcon icon={faTrashCan} />
							</AButton>
						)} */}
							<MemeCopyButton data={dataImage} />
						</div>
					</div>

					<div className="mt-5 rounded-2xl bg-gray-100 p-3">
						{/* Combined stats and account info in horizontal row */}
						<div className="flex items-center justify-between">
							{/* Stats on the left */}
							<div className="flex items-center gap-6 text-sm text-gray-500">
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faEye} size="sm" />
									{dataImage?.viewCount || 0}
								</span>
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faThumbsUp} size="sm" />
									{dataImage?.likeCount || 0}
								</span>
								<span className="flex items-center gap-1">
									<FontAwesomeIcon icon={faCopy} size="sm" />
									{dataImage?.copyCount || 0}
								</span>
							</div>

							{/* Account info on the right */}
							{creatorData && (
								<div className="w-fit">
									<MUserCard
										variant="minimal"
										user={creatorData}
										enableFollowModal={false}
									/>
								</div>
							)}
						</div>

						{dataImage?.name && (
							<h2 className="mt-4 text-2xl font-bold text-gray-900">
								{dataImage?.name}
							</h2>
						)}

						{dataImage?.description && (
							<p className="leading-relaxed text-gray-600">
								{dataImage.description}
							</p>
						)}
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
