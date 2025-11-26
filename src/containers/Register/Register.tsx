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
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12 dark:bg-gray-800">
			<div className="xs:p-0 mx-auto w-full p-4 md:max-w-md md:p-10">
				<div className="mb-4 flex items-center justify-center md:mb-5">
					<div
						onClick={() => (window.location.href = '/')}
						className="cursor-pointer"
					>
						<MainIcon />
					</div>
				</div>
				<div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div className="px-4 py-5 md:px-5 md:py-7">
						<FormRegister />
					</div>
					<div className="p-4 md:p-5">
						<div className="grid">
							<div className="flex w-full justify-center gap-3 md:gap-5">
								<ALink addClass="my-3 md:my-4">
									<GoogleIcon />
									<span className="text-xs md:text-sm">{t('google')}</span>
								</ALink>
								<ALink addClass="my-3 md:my-4">
									<FacebookIcon />
									<span className="text-xs md:text-sm">{t('facebook')}</span>
								</ALink>
							</div>
						</div>
					</div>
				</div>
				<div className="py-4 md:py-5">
					<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
						<div className="whitespace-nowrap text-center md:text-left">
							<AOutlineButton onClick={goBack}>
								<FontAwesomeIcon
									icon={faArrowLeft}
									className="text-xs md:text-sm"
								/>
								<span className="ml-1 inline-block text-xs md:text-sm">
									{t('backToApp')}
								</span>
							</AOutlineButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
