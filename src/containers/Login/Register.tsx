import { t } from 'i18next';

import MainIcon from 'src/assets/icon/MainIcon';
import GoogleIcon from 'src/assets/icon/GoogleIcon';
import ALink from 'src/component/atoms/AButton/ALink';
import AInput from 'src/component/atoms/AInput/AInput';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import AButton from 'src/component/atoms/AButton/AButton';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOutlineButton from 'src/component/atoms/AButton/AOutlineButton';

function Register() {
	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
			<div className="xs:p-0 mx-auto p-10 md:w-full md:max-w-md">
				<div className="mb-5 flex items-center justify-center">
					<div onClick={() => (window.location.href = '/')}>
						<MainIcon />
					</div>
				</div>
				<div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div className="px-5 py-7">
						<AInput addClassWrapper="mt-3" label={t('email')} />
						<AInput
							addClassWrapper="mt-3"
							label={t('password')}
							type="password"
						/>
						<AInput
							addClassWrapper="mt-3"
							label={t('repassword')}
							type="password"
						/>
						<div className="mt-7 flex justify-center align-middle">
							<AButton content={t('register')} />
						</div>
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
							<AOutlineButton>
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
