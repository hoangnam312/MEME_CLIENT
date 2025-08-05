import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { RATE_LIMITS } from 'src/constants/mail';

export type VerificationContext = 'email-verification' | 'password-reset';

interface VerificationResult {
	message: string;
	verified: boolean;
	verifiedAt?: string;
	resetToken?: string;
}

interface VerificationCodeInputProps {
	email: string;
	onVerificationSuccess: (data?: VerificationResult) => void;
	onResendCode?: () => Promise<{
		expiresAt: string;
		canResendAt?: string;
		message: string;
	}>;
	onVerifyCode: (code: string) => Promise<{
		message: string;
		verified: boolean;
		verifiedAt?: string;
		resetToken?: string;
	}>;
	initialTimer?: number; // Initial resend timer in seconds
	showTitle?: boolean;
	className?: string;
	onBack?: () => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
	email,
	onVerificationSuccess,
	onResendCode,
	onVerifyCode,
	initialTimer = RATE_LIMITS.SEND_EMAIL_FIRST_TIME,
	showTitle = true,
	className = '',
	onBack,
}) => {
	// State management
	const [code, setCode] = useState(['', '', '', '', '', '']);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [resendTimer, setResendTimer] = useState(initialTimer);
	const [verificationStatus, setVerificationStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [attempts, setAttempts] = useState(0);
	const [isBlocked, setIsBlocked] = useState(false);
	const [expiresAt, setExpiresAt] = useState<Date | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');

	// Refs for code inputs
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Timer effects
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (resendTimer > 0) {
			interval = setInterval(() => {
				setResendTimer((prev: number) => {
					if (prev <= 1) {
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
			setIsBlocked(true);
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

		setIsVerifying(true);
		setAttempts((prev: number) => prev + 1);

		try {
			const result = await onVerifyCode(verificationCode);

			setVerificationStatus('success');
			toast.success(result.message || t('emailVerification.success'));

			// Call success callback with result data
			onVerificationSuccess(result);
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
		if (!onResendCode) return;

		setIsResending(true);

		try {
			const result = await onResendCode();

			toast.success(result.message);

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
				setResendTimer(900); // 15 minutes default
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

	return (
		<div className={`space-y-8 ${className}`}>
			<div className="rounded-lg bg-white px-5 py-7 shadow ">
				{showTitle && (
					<div className="text-center">
						<div className="mb-4"></div>
						<h2 className="text-3xl font-extrabold text-gray-900">
							{t('emailVerification.title')}
						</h2>
						<p className="mt-2 text-sm text-gray-600">
							{t('emailVerification.subtitle', { email })}
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
				)}

				<div className="space-y-6 py-12">
					{/* 6-digit code input */}
					<div className="flex justify-center space-x-2">
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
									isVerifying || verificationStatus === 'success' || isBlocked
								}
								className={`h-12 w-12 rounded-lg border-2 text-center text-xl font-semibold transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									verificationStatus === 'error'
										? 'border-red-300 bg-red-50'
										: verificationStatus === 'success'
										? 'border-green-300 bg-green-50'
										: 'border-gray-300 bg-white hover:border-gray-400'
								} ${
									isVerifying || verificationStatus === 'success' || isBlocked
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
							{t('emailVerification.attempts')}:{' '}
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
								isBlocked
							}
							addClass="w-full"
						>
							{isVerifying ? (
								<div className="flex items-center justify-center space-x-2">
									<span>{t('emailVerification.verifying')}</span>
								</div>
							) : (
								t('emailVerification.verify')
							)}
						</AButton>
					</div>

					{/* Resend section */}
				</div>

				{onResendCode && (
					<div className="space-y-2 text-center">
						<p className="text-sm text-gray-600">
							{t('emailVerification.didntReceive')}
						</p>
						{resendTimer > 0 ? (
							<span className="text-gray-600">
								{t('emailVerification.resendIn')} {formatTimer(resendTimer)}
							</span>
						) : (
							<div className="flex justify-center">
								<AOutlineButton
									onClick={handleResendCode}
									isDisabled={isResending}
								>
									{t('emailVerification.resendCode')}
								</AOutlineButton>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="text-center">
				<AOutlineButton
					onClick={onBack}
					addClass="text-sm"
					isDisabled={isVerifying}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
					<span className="ml-2">{t('getBack')}</span>
				</AOutlineButton>
			</div>
		</div>
	);
};

export default VerificationCodeInput;
