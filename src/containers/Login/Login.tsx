import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

import { Path } from 'src/constants/type';
import MainIcon from 'src/assets/icon/MainIcon';
import GoogleIcon from 'src/assets/icon/GoogleIcon';
import ALink from 'src/component/atoms/AButton/ALink';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import AButton from 'src/component/atoms/AButton/AButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AOutlineButton from 'src/component/atoms/AButton/AOutlineButton';
import {
	faArrowLeft,
	faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons';

import FormLogin from './FormLogin';

function Login() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
			<div className="xs:p-0 mx-auto p-10 md:w-full md:max-w-md">
				<div className="mb-5 flex items-center justify-center">
					<div onClick={() => navigate(Path.HOME_PAGE)}>
						<MainIcon />
					</div>
				</div>
				<div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div className="px-5 py-7">
						<FormLogin />
					</div>
					<div className="p-5">
						<div className="grid">
							<div className="flex w-full justify-center gap-5 ">
								<ALink addClass="mt-4">
									<GoogleIcon />
									<span>{t('google')}</span>
								</ALink>
								<ALink addClass="mt-4">
									<FacebookIcon />
									<span>{t('facebook')}</span>
								</ALink>
							</div>
						</div>
						<div className="mt-2 flex flex-col items-center p-5 sm:flex-row">
							<p>{t('Login.notAccountYet')}</p>
							<AButton addClass="sm:ml-2 mt-1">{t('Login.signUp')}</AButton>
						</div>
					</div>
					<div className="py-5">
						<div className="grid grid-cols-2 gap-1">
							<div className="whitespace-nowrap text-center sm:text-left">
								<AOutlineButton addClass="mx-5">
									<FontAwesomeIcon icon={faUnlockKeyhole} />
									<span className="ml-1 inline-block">
										{t('Login.forgotPassword')}
									</span>
								</AOutlineButton>
							</div>
						</div>
					</div>
				</div>
				<div className="py-5">
					<div className="grid grid-cols-2 gap-1">
						<div className="whitespace-nowrap text-center sm:text-left">
							<AOutlineButton onClick={() => navigate(Path.HOME_PAGE)}>
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

export default Login;
