import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { RATE_LIMITS } from 'src/constants/mail';
import { Path } from 'src/constants/type';
import { sendVerificationCode, verifyEmail } from 'src/service/auth';
import { useBoundStore } from 'src/store/store';

interface EmailVerificationProps {
	email?: string;
	onVerificationSuccess?: () => void;
	showBackButton?: boolean;
	redirectTo?: string;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({
	email: propEmail,
	onVerificationSuccess,
	showBackButton = true,
	redirectTo,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { updateAuthen, email: storeEmail } = useBoundStore(
		(state) => state.authen
	);

	// State management
	const [code, setCode] = useState(['', '', '', '', '', '']);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [resendTimer, setResendTimer] = useState(
		RATE_LIMITS.SEND_EMAIL_FIRST_TIME
	);
	const [canResend, setCanResend] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [isBlock, setIsBlock] = useState(false);
	const [attempts, setAttempts] = useState(0);
	const [expiresAt, setExpiresAt] = useState<Date | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');

	// Refs for code inputs
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Get email and redirect path from props, store, or location state
	const locationState = location.state as {
		email?: string;
		redirectTo?: string;
	};
	const currentEmail = propEmail || storeEmail || locationState?.email;
	const redirectPath = redirectTo || locationState?.redirectTo || Path.LOGIN;

	// Timer effects
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (resendTimer > 0) {
			interval = setInterval(() => {
				setResendTimer((prev) => {
					if (prev <= 1) {
						setCanResend(true);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [resendTimer]);

	// Code expiration timer
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (expiresAt) {
			interval = setInterval(() => {
				const now = new Date();
				const timeRemaining = expiresAt.getTime() - now.getTime();

				if (timeRemaining <= 0) {
					setTimeLeft('Expired');
					clearInterval(interval);
				} else {
					const minutes = Math.floor(timeRemaining / (1000 * 60));
					const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
					setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
				}
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [expiresAt]);

	// Auto-focus first input on mount
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	useEffect(() => {
		if (attempts >= RATE_LIMITS.VERIFY_CODE.MAX_ATTEMP) {
			setIsBlock(true);
			toast.error(t('emailVerification.block'));
		}
	}, [attempts]);

	// Handle code input changes
	const handleCodeChange = (index: number, value: string) => {
		// Only allow digits
		if (!/^\d*$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value.slice(-1); // Only take the last character
		setCode(newCode);

		// Auto-advance to next input
		if (value && index < 5 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus();
		}

		// Auto-submit when all 6 digits are entered
		if (
			newCode.every((digit) => digit !== '') &&
			newCode.join('').length === 6
		) {
			handleVerifyCode(newCode.join(''));
		}
	};

	// Handle backspace
	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			// Move to previous input if current is empty
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === 'ArrowLeft' && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === 'ArrowRight' && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Handle paste
	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData
			.getData('text/plain')
			.replace(/\D/g, '')
			.slice(0, 6);

		if (pastedData.length === 6) {
			const newCode = pastedData.split('');
			setCode(newCode);

			// Focus last input
			inputRefs.current[5]?.focus();

			// Auto-submit
			handleVerifyCode(pastedData);
		}
	};

	// Verify the code
	const handleVerifyCode = async (codeToVerify?: string) => {
		const verificationCode = codeToVerify || code.join('');

		if (verificationCode.length !== 6) {
			toast.error(t('emailVerification.invalidCodeLength'));
			return;
		}

		if (!currentEmail) {
			toast.error(t('emailVerification.emailRequired'));
			return;
		}

		setIsVerifying(true);
		setAttempts((prev) => prev + 1);

		try {
			const response = await verifyEmail({
				code: verificationCode,
				email: currentEmail,
			});

			const result = response.data as {
				message: string;
				verified: boolean;
				verifiedAt: string;
			};

			// Update auth store with verified status
			updateAuthen({
				emailVerification: {
					isVerified: true,
					verifiedAt: result.verifiedAt,
				},
			});

			setVerificationStatus('success');
			toast.success(result.message || t('emailVerification.success'));

			// Call success callback or navigate
			if (onVerificationSuccess) {
				onVerificationSuccess();
			} else {
				// Navigate to appropriate page after delay
				setTimeout(() => {
					navigate(redirectPath, { replace: true });
				}, 1000);
			}
		} catch (error) {
			setVerificationStatus('error');
			setCode(['', '', '', '', '', '']); // Clear code on error

			if (error instanceof AxiosError && error.response) {
				const errorMessage =
					error.response.data?.message || error.response.data;
				toast.error(errorMessage);

				// Focus first input after error
				setTimeout(() => {
					inputRefs.current[0]?.focus();
				}, 100);
			} else {
				toast.error(t('emailVerification.verificationError'));
			}
		} finally {
			setIsVerifying(false);
		}
	};

	// Resend verification code
	const handleResendCode = async () => {
		if (!currentEmail) {
			toast.error(t('emailVerification.emailRequired'));
			return;
		}

		setIsResending(true);
		setCanResend(false);

		try {
			const response = await sendVerificationCode({ email: currentEmail });
			const result = response.data as {
				message: string;
				expiresAt: string;
				canResendAt?: string;
			};

			toast.success(result.message || t('emailVerification.codeSent'));

			// Reset state
			setCode(['', '', '', '', '', '']);
			setVerificationStatus('idle');
			setAttempts(0);

			// Set expiration timer
			setExpiresAt(new Date(result.expiresAt));

			// Set resend timer
			if (result.canResendAt) {
				const canResendTime = new Date(result.canResendAt);
				const now = new Date();
				const timeDiff = Math.ceil(
					(canResendTime.getTime() - now.getTime()) / 1000
				);
				setResendTimer(timeDiff > 0 ? timeDiff : 0);
			} else {
				setResendTimer(RATE_LIMITS.SEND_EMAIL_NEXT_TIME);
			}

			// Focus first input
			setTimeout(() => {
				inputRefs.current[0]?.focus();
			}, 100);
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage =
					error.response.data?.message || error.response.data;
				toast.error(errorMessage);
			} else {
				toast.error(t('emailVerification.resendError'));
			}
			setCanResend(true);
		} finally {
			setIsResending(false);
		}
	};

	// Format resend timer
	const formatTimer = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	if (!currentEmail) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-800">
				<div className="w-full max-w-md space-y-8 p-8">
					<div className="text-center">
						<FontAwesomeIcon
							icon={faTimes}
							className="mb-4 text-4xl text-red-500"
						/>
						<h2 className="text-2xl font-bold text-gray-900">
							{t('emailVerification.emailRequired')}
						</h2>
						<p className="mt-2 text-gray-600">
							{t('emailVerification.pleaseProvideEmail')}
						</p>
						<div className="mt-6">
							<AButton
								content={t('backToLogin')}
								onClick={() => navigate(Path.LOGIN)}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100 px-3 py-6 sm:px-6 md:py-12 lg:px-8">
			<div className="w-full max-w-md space-y-6 md:space-y-10">
				<div className="space-y-5 rounded-lg bg-white px-4 py-5 shadow md:space-y-8 md:px-5 md:py-7">
					<div className="text-center">
						<h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
							{t('emailVerification.title')}
						</h2>
						<p className="mt-1 text-xs text-gray-600 md:mt-2 md:text-sm">
							{t('emailVerification.subtitle', { email: currentEmail })}
						</p>
						{timeLeft && timeLeft !== 'Expired' && (
							<p className="mt-1 text-xs text-gray-500">
								{t('emailVerification.expiresIn')}: {timeLeft}
							</p>
						)}
						{timeLeft === 'Expired' && (
							<p className="mt-1 text-xs text-red-500">
								{t('emailVerification.codeExpired')}
							</p>
						)}
					</div>

					<div>
						<div className="space-y-4 py-8 md:space-y-6 md:py-12">
							{/* 6-digit code input */}
							<div className="flex justify-center space-x-1.5 md:space-x-2">
								{code.map((digit, index) => (
									<input
										key={index}
										ref={(el) => (inputRefs.current[index] = el)}
										type="text"
										inputMode="numeric"
										pattern="[0-9]*"
										maxLength={1}
										value={digit}
										onChange={(e) => handleCodeChange(index, e.target.value)}
										onKeyDown={(e) => handleKeyDown(index, e)}
										onPaste={index === 0 ? handlePaste : undefined}
										disabled={
											isVerifying || verificationStatus === 'success' || isBlock
										}
										className={`h-10 w-10 rounded-lg border-2 text-center text-lg font-semibold transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:h-12 md:w-12 md:text-xl ${
											verificationStatus === 'error'
												? 'border-red-300 bg-red-50'
												: verificationStatus === 'success'
												? 'border-green-300 bg-green-50'
												: 'border-gray-300 bg-white hover:border-gray-400'
										} ${
											isVerifying || verificationStatus === 'success' || isBlock
												? 'cursor-not-allowed opacity-50'
												: ''
										}`}
										autoComplete="off"
									/>
								))}
							</div>

							{/* Attempt counter */}
							{attempts > 0 && (
								<div className="text-center text-sm text-gray-500">
									{t('emailVerification.attempts')}: {attempts}/
									{RATE_LIMITS.VERIFY_CODE.MAX_ATTEMP}
								</div>
							)}

							{/* Verify button (manual trigger) */}
							<div className="text-center">
								<AButton
									onClick={() => handleVerifyCode()}
									isDisabled={
										isVerifying ||
										code.join('').length !== 6 ||
										verificationStatus === 'success' ||
										isBlock
									}
									addClass="w-full"
								>
									{isVerifying ? (
										<div className="flex items-center justify-center space-x-2">
											<ALoading />
											<span>{t('emailVerification.verifying')}</span>
										</div>
									) : (
										t('emailVerification.verify')
									)}
								</AButton>
							</div>
						</div>

						{/* Resend section */}
						<div className="space-y-2 text-center">
							<p className="text-sm text-gray-600">
								{t('emailVerification.didntReceive')}
							</p>
							<div className="flex justify-center">
								<AOutlineButton
									onClick={handleResendCode}
									isDisabled={isResending}
								>
									{canResend && !isResending ? (
										t('emailVerification.resendCode')
									) : isResending ? (
										<span>{t('emailVerification.sending')}</span>
									) : (
										`${t('emailVerification.resendIn')} ${formatTimer(
											resendTimer
										)}`
									)}
								</AOutlineButton>
							</div>
						</div>
					</div>
				</div>

				{/* Back button */}
				{showBackButton && (
					<div className="text-center">
						<AOutlineButton onClick={() => navigate(-1)} addClass="text-sm">
							<FontAwesomeIcon icon={faArrowLeft} />
							<span className="ml-2">{t('getBack')}</span>
						</AOutlineButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default EmailVerification;
