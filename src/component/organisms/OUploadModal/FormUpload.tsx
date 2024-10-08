import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import AInput from 'src/component/atoms/AInput/AInput';
import {
	faHashtag,
	faPen,
	faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import AButton from 'src/component/atoms/AButton/AButton';

export type TInputs = {
	name: string;
	description: string;
	tag: string;
};

interface FormUploadPropsType {
	isDisabledButtonSave: boolean;
	handleSave: (data: TInputs) => void;
}

const FormUpload = ({
	isDisabledButtonSave,
	handleSave,
}: FormUploadPropsType) => {
	const { register, handleSubmit } = useForm<TInputs>();

	return (
		<form onSubmit={handleSubmit(handleSave)}>
			<AInput
				addClassWrapper="mt-3"
				icon={<FontAwesomeIcon className="text-violet-900" icon={faPen} />}
				rest={{
					placeholder: t('UploadModal.name'),
					...register('name'),
				}}
			/>
			<AInput
				addClassWrapper="mt-3"
				icon={
					<FontAwesomeIcon className="text-violet-900" icon={faPenToSquare} />
				}
				rest={{
					placeholder: t('UploadModal.description'),
					...register('description'),
				}}
			/>
			<AInput
				addClassWrapper="mt-3"
				icon={<FontAwesomeIcon className="text-violet-900" icon={faHashtag} />}
				rest={{
					placeholder: t('UploadModal.tag'),
					...register('tag'),
				}}
			/>
			<div className="mt-5 flex justify-center self-center">
				<AButton
					isDisabled={isDisabledButtonSave}
					onClick={handleSubmit(handleSave)}
				>
					{t('save')}
				</AButton>
				{/* <AButton
					addClass={'ml-4'}
					isDisabled={isDisabledButtonSaveLink}
					onClick={handleSubmit(handleSaveOnlyLink)}
				>
					{t('saveLink')}
				</AButton> */}
			</div>
			<div className="mt-3 flex justify-end self-center">
				<div className="w-3/5">
					<p className="text-right text-sm italic text-gray-500">
						{t('saveLink.explant')}
					</p>
				</div>
			</div>
		</form>
	);
};

export default FormUpload;
