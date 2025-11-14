import { t } from 'i18next';

import MainIcon from 'src/assets/icon/MainIcon';
import GoogleIcon from 'src/assets/icon/GoogleIcon';
import ALink from 'src/component/atoms/Alink/ALink';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';

import FormRegister from './FormRegister';
import useNavigateBack from 'src/hooks/useNavigateBack';

function Register() {
	const goBack = useNavigateBack();

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12 dark:bg-gray-800">
			<div className="xs:p-0 mx-auto p-10 md:w-full md:max-w-md">
				<div className="mb-5 flex items-center justify-center">
					<div onClick={() => (window.location.href = '/')}>
						<MainIcon />
					</div>
				</div>
				<div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div className="px-5 py-7">
						<FormRegister />
					</div>
					<div className="p-5">
						<div className="grid">
							<div className="flex w-full justify-center gap-5 ">
								<ALink addClass="my-4">
									<GoogleIcon />
									<span>{t('google')}</span>
								</ALink>
								<ALink addClass="my-4">
									<FacebookIcon />
									<span>{t('facebook')}</span>
								</ALink>
							</div>
						</div>
					</div>
				</div>
				<div className="py-5">
					<div className="grid grid-cols-2 gap-1">
						<div className="whitespace-nowrap text-center sm:text-left">
							<AOutlineButton onClick={goBack}>
								<FontAwesomeIcon icon={faArrowLeft} />
								<span className="ml-1 inline-block">{t('backToApp')}</span>
							</AOutlineButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
