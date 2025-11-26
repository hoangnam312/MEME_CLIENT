import {
	faArrowLeft,
	faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import FacebookIcon from 'src/assets/icon/FacebookIcon';
import GoogleIcon from 'src/assets/icon/GoogleIcon';
import MainIcon from 'src/assets/icon/MainIcon';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import ASquareOutlineButton from 'src/component/atoms/ASquareOutlineButton/ASquareOutlineButton';
import { Path } from 'src/constants/type';
import useNavigateBack from 'src/hooks/useNavigateBack';
import FormLogin from './FormLogin';
import useLoginWithFacebook from './useLoginWithFacebook';
import useLoginWithGoogle from './useLoginWithGoogle';

const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

function Login() {
	const navigate = useNavigate();
	const goBack = useNavigateBack();
	const { loginWithGoogle } = useLoginWithGoogle();
	const { onSuccess: onSuccessFacebook, onError: onErrorFacebook } =
		useLoginWithFacebook();

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12 dark:bg-gray-800">
			<div className="xs:p-0 mx-auto w-full p-4 md:max-w-md md:p-10">
				<div className="mb-4 flex items-center justify-center md:mb-5">
					<div
						onClick={() => navigate(Path.HOME_PAGE)}
						className="cursor-pointer"
					>
						<MainIcon />
					</div>
				</div>
				<div className="w-full divide-y divide-gray-200 rounded-lg bg-white shadow">
					<div className="px-4 py-5 md:px-5 md:py-7">
						<FormLogin />
					</div>
					<div className="p-4 md:p-5">
						<div className="grid">
							<div className="flex w-full justify-center gap-3 md:gap-5">
								<ASquareOutlineButton
									onClick={loginWithGoogle}
									addClass="mt-3 md:mt-4"
								>
									<GoogleIcon />
									<span className="text-xs md:text-sm">{t('google')}</span>
								</ASquareOutlineButton>
								<FacebookLogin
									appId={FACEBOOK_APP_ID}
									onSuccess={(response) => {
										onSuccessFacebook(response);
									}}
									onFail={(error) => {
										onErrorFacebook(error);
									}}
									render={({ onClick }) => (
										<ASquareOutlineButton
											onClick={onClick}
											addClass="mt-3 md:mt-4"
										>
											<FacebookIcon />
											<span className="text-xs md:text-sm">
												{t('facebook')}
											</span>
										</ASquareOutlineButton>
									)}
								/>
							</div>
						</div>
						<div className="mt-2 flex flex-col items-center gap-1 p-3 sm:flex-row sm:gap-0 md:p-5">
							<p className="text-xs md:text-sm">{t('Login.notAccountYet')}</p>
							<AButton
								onClick={() => navigate(Path.REGISTER)}
								addClass="sm:ml-2 mt-1"
							>
								{t('Login.signUp')}
							</AButton>
						</div>
					</div>
					<div className="py-4 md:py-5">
						<div className="grid grid-cols-1 gap-1 md:grid-cols-2">
							<div className="whitespace-nowrap text-center md:text-left">
								<AOutlineButton
									addClass="mx-3 md:mx-5"
									onClick={() => navigate(Path.FORGOT_PASSWORD)}
								>
									<FontAwesomeIcon
										icon={faUnlockKeyhole}
										className="text-xs md:text-sm"
									/>
									<span className="ml-1 inline-block text-xs md:text-sm">
										{t('Login.forgotPassword')}
									</span>
								</AOutlineButton>
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

export default Login;
