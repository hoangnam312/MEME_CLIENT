import React, { useState } from 'react';

import VerificationCodeInput from 'src/component/organisms/VerificationCodeInput/VerificationCodeInput';
import { forgotPassword, verifyResetCode } from 'src/service/auth';
import ForgotPasswordEmail from './components/ForgotPasswordEmail';
import NewResetPassword from './components/ResetPassword';
import SuccessStep from './components/SuccessStep';
import { RATE_LIMITS } from 'src/constants/mail';

type ForgotPasswordStep = 'email' | 'verification' | 'reset' | 'success';

interface ForgotPasswordState {
	step: ForgotPasswordStep;
	email: string;
	code: string;
	expiresAt?: string;
	canResendAt?: string;
}

const ForgotPassword: React.FC = () => {
	const [state, setState] = useState<ForgotPasswordState>({
		step: 'email',
		email: '',
		code: '',
	});

	const updateState = (updates: Partial<ForgotPasswordState>) => {
		setState((prev: ForgotPasswordState) => ({ ...prev, ...updates }));
	};

	// Handle email step completion
	const handleEmailSubmit = (data: {
		email: string;
		expiresAt: string;
		canResendAt?: string;
	}) => {
		updateState({
			step: 'verification',
			email: data.email,
			expiresAt: data.expiresAt,
			canResendAt: data.canResendAt,
		});
	};

	// Handle verification code resend
	const handleResendCode = async (): Promise<{
		expiresAt: string;
		canResendAt?: string;
		message: string;
	}> => {
		const response = await forgotPassword({ email: state.email });
		const result = response.data;

		updateState({
			expiresAt: result.expiresAt,
			canResendAt: result.canResendAt,
		});

		return {
			expiresAt: result.expiresAt,
			canResendAt: result.canResendAt,
			message: result.message,
		};
	};

	// Handle verification code verification
	const handleVerifyCode = async (
		code: string
	): Promise<{ message: string; verified: boolean; resetToken?: string }> => {
		const response = await verifyResetCode({ email: state.email, code });
		const result = response.data;

		if (result.verified) {
			updateState({
				step: 'reset',
				code,
			});
		}

		return {
			message: result.message,
			verified: result.verified,
			resetToken: result.resetToken,
		};
	};

	// Handle verification success
	const handleVerificationSuccess = () => {
		// The verification step already updates the state to 'reset'
		// This is called after successful verification
	};

	// Handle password reset success
	const handleResetSuccess = () => {
		updateState({ step: 'success' });
	};

	// Handle back navigation
	const handleBackToEmail = () => {
		updateState({
			step: 'email',
			code: '',
			expiresAt: undefined,
			canResendAt: undefined,
		});
	};

	const handleBackToVerification = () => {
		updateState({ step: 'verification' });
	};

	// Progress indicator
	const renderProgressIndicator = () => {
		const steps = ['email', 'verification', 'reset', 'success'];
		const currentStepIndex = steps.indexOf(state.step);

		return (
			<div className="mb-6 flex justify-center">
				<div className="flex space-x-2">
					{steps.map((_, index) => (
						<div
							key={index}
							className={`h-2 w-8 rounded ${
								index <= currentStepIndex ? 'bg-violet-600' : 'bg-gray-300'
							}`}
						/>
					))}
				</div>
			</div>
		);
	};

	// Render current step
	const renderStep = () => {
		switch (state.step) {
			case 'email':
				return <ForgotPasswordEmail onNext={handleEmailSubmit} />;

			case 'verification':
				return (
					<div>
						{renderProgressIndicator()}
						<VerificationCodeInput
							email={state.email}
							onVerificationSuccess={handleVerificationSuccess}
							onResendCode={handleResendCode}
							onVerifyCode={handleVerifyCode}
							initialTimer={
								state.canResendAt
									? Math.ceil(
											new Date(state.canResendAt).getTime() - Date.now()
									  ) / 1000
									: RATE_LIMITS.SEND_EMAIL_FIRST_TIME
							}
							showTitle={true}
							onBack={handleBackToEmail}
						/>
					</div>
				);

			case 'reset':
				return (
					<div>
						{renderProgressIndicator()}
						<NewResetPassword
							email={state.email}
							code={state.code}
							onSuccess={handleResetSuccess}
							onBack={handleBackToVerification}
						/>
					</div>
				);

			case 'success':
				return (
					<div>
						{renderProgressIndicator()}
						<SuccessStep />
					</div>
				);

			default:
				return <ForgotPasswordEmail onNext={handleEmailSubmit} />;
		}
	};

	return (
		<div className="forgot-password-container">
			<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-800">
				<div className="w-full max-w-md">{renderStep()}</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
