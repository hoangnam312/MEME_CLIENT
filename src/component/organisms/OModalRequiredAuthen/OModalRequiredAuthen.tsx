import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { t } from 'i18next';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import AButton from 'src/component/atoms/AButton/AButton';
import AModal from 'src/component/atoms/AModal/AModal';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { Path } from 'src/constants/type';
import useNavigateBack from 'src/hooks/useNavigateBack';
import { useBoundStore } from 'src/store/store';

export interface ORequiredAuthenPropsType {
	children: ReactNode;
}

const OModalRequiredAuthen = ({ children }: ORequiredAuthenPropsType) => {
	const { sessionToken } = useBoundStore((state) => state.authen);
	const navigate = useNavigate();
	const goBack = useNavigateBack();

	if (!sessionToken) {
		return (
			<AModal
				isOpen={true}
				closeModal={() => {
					console.log('upload');
				}}
			>
				<div className="flex flex-col">
					<div className="my-5 flex justify-center text-2xl font-semibold text-violet-900">
						{t('requireLogin')}
					</div>
					<div className="my-5 flex justify-evenly">
						<AButton
							onClick={() => navigate(Path.LOGIN)}
							content={t('login')}
						/>
						<AButton
							onClick={() => navigate(Path.REGISTER)}
							content={t('register')}
						/>
					</div>
					<div className="flex">
						<AOutlineButton onClick={goBack}>
							<FontAwesomeIcon icon={faArrowLeft} />
							<span className="ml-1 inline-block">{t('backToApp')}</span>
						</AOutlineButton>
					</div>
				</div>
			</AModal>
		);
	}

	return children;
};

export default OModalRequiredAuthen;
