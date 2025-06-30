import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { AxiosError } from 'axios';

import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { verifyResetCode, forgotPassword } from 'src/service/auth';
import {
	codeValidationSchema,
	CodeFormData,
} from '../forgotPassword.validation';
import { StepProps } from '../forgotPassword.types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CodeVerificationStep: React.FC<StepProps> = ({ state, onNext }) => {
	const [timer, setTimer] = useState(state.timer);
	const [canResend, setCanResend] = useState(state.canResend);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<CodeFormData>({
		resolver: yupResolver(codeValidationSchema),
		mode: 'onChange',
	});

	// Timer countdown
	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => {
					if (prev <= 1) {
						setCanResend(true);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const onSubmit = async (data: CodeFormData) => {
		if (state.attempts >= 3) {
			toast.error(t('forgotPassword.codeStep.tooManyAttempts'));
			return;
		}

		try {
			await verifyResetCode({ email: state.email, code: data.code });
			onNext({
				code: data.code,
				step: 'RESET_PASSWORD',
			});
		} catch (error) {
			const newAttempts = state.attempts + 1;
			onNext({ attempts: newAttempts });

			if (error instanceof AxiosError && error.response) {
				const errorMessage = error.response.data?.error || error.response.data;
				if (errorMessage.includes('expired')) {
					toast.error(t('forgotPassword.messages.codeExpired'));
				} else if (
					errorMessage.includes('invalid') ||
					errorMessage.includes('Invalid')
				) {
					if (newAttempts >= 3) {
						toast.error(t('forgotPassword.codeStep.tooManyAttempts'));
					} else {
						toast.error(
							t('forgotPassword.codeStep.attemptsRemaining', {
								attempts: 3 - newAttempts,
							})
						);
					}
				} else {
					toast.error(errorMessage);
				}
			} else {
				toast.error(t('forgotPassword.messages.invalidCode'));
			}
			reset();
		}
	};

	const handleResend = async () => {
		try {
			await forgotPassword({ email: state.email });
			setTimer(300); // 5 minutes
			setCanResend(false);
			onNext({
				attempts: 0,
				timer: 300,
				canResend: false,
			});
			toast.success(t('forgotPassword.messages.codeResent'));
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage = error.response.data?.error || error.response.data;
				toast.error(errorMessage);
			} else {
				toast.error(t('forgotPassword.messages.unexpectedError'));
			}
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const handleBackToEmail = () => {
		onNext({
			step: 'EMAIL',
			code: '',
			attempts: 0,
			timer: 0,
			canResend: false,
		});
	};

	return (
		<div className="space-y-20">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-900">
					{t('forgotPassword.codeStep.title')}
				</h2>
				<p className="mt-2 text-gray-600">
					{t('forgotPassword.codeStep.subtitle', { email: state.email })}
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<AInput
						type="text"
						label={t('forgotPassword.codeStep.codeLabel')}
						rest={{
							...register('code'),
							disabled: isSubmitting || state.attempts >= 3,
							maxLength: 6,
							placeholder: t('forgotPassword.codeStep.codePlaceholder'),
							autoFocus: true,
							pattern: '[0-9]*',
							inputMode: 'numeric',
						}}
					/>
					{errors.code?.message && (
						<p className="mt-2 text-sm text-red-500">
							{errors.code.message.includes('digits')
								? errors.code.message
								: t(errors.code.message)}
						</p>
					)}
				</div>

				<div className="flex justify-center">
					<AButton
						content={t('forgotPassword.codeStep.verifyButton')}
						rest={{
							type: 'submit',
							disabled: isSubmitting || state.attempts >= 3,
						}}
					/>
				</div>
			</form>

			<div>
				<div className="flex justify-center text-center">
					{timer > 0 ? (
						<p className="text-sm text-gray-600">
							{t('forgotPassword.codeStep.resendIn', {
								time: formatTime(timer),
							})}
						</p>
					) : (
						<AButton
							content={t('forgotPassword.codeStep.resendCode')}
							rest={{
								onClick: handleResend,
								isDisabled: !canResend || isSubmitting,
							}}
						/>
					)}
				</div>
				<AOutlineButton onClick={handleBackToEmail} addClass="text-sm">
					<FontAwesomeIcon icon={faArrowLeft} />
					<span className="ml-1 inline-block">{t('getBack')}</span>
				</AOutlineButton>
			</div>

			{state.attempts > 0 && state.attempts < 3 && (
				<div className="text-center">
					<p className="text-sm text-orange-600">
						{t('forgotPassword.codeStep.attemptsRemaining', {
							attempts: 3 - state.attempts,
						})}
					</p>
				</div>
			)}
		</div>
	);
};

export default CodeVerificationStep;
