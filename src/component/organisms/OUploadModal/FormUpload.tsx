import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import AInput from 'src/component/atoms/AInput/AInput';
import { faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import AButton from 'src/component/atoms/AButton/AButton';
import ALoading from 'src/component/atoms/ALoading/ALoading';

export type TInputs = {
	name: string;
	description: string;
};

interface FormUploadPropsType {
	isLoading?: boolean;
	isDisabledButtonSave: boolean;
	handleSave: (data: TInputs) => void;
}

const FormUpload = ({
	isDisabledButtonSave,
	handleSave,
	isLoading = false,
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
			<div className="mt-5 flex justify-center self-center">
				<AButton
					isDisabled={isDisabledButtonSave}
					onClick={handleSubmit(handleSave)}
				>
					{isLoading ? <ALoading size="xl" /> : t('save')}
				</AButton>
			</div>
		</form>
	);
};

export default FormUpload;
