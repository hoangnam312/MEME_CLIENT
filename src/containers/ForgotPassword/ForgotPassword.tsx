import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import MainIcon from 'src/assets/icon/MainIcon';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import useNavigateBack from 'src/hooks/useNavigateBack';
import { Path } from 'src/constants/type';
import { ForgotPasswordState, StepType } from './forgotPassword.types';

import EmailStep from './components/EmailStep';
import CodeVerificationStep from './components/CodeVerificationStep';
import ResetPasswordStep from './components/ResetPasswordStep';
import SuccessStep from './components/SuccessStep';

const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();
	const goBack = useNavigateBack();

	const [state, setState] = useState<ForgotPasswordState>({
		step: 'EMAIL',
		email: '',
		code: '',
		timer: 0,
		attempts: 0,
		isLocked: false,
		canResend: false,
	});

	const updateState = (updates: Partial<ForgotPasswordState>) => {
		setState((prev) => ({ ...prev, ...updates }));
	};

	const getStepNumber = (step: StepType): number => {
		switch (step) {
			case 'EMAIL':
				return 1;
			case 'CODE_VERIFICATION':
				return 2;
			case 'RESET_PASSWORD':
				return 3;
			case 'SUCCESS':
				return 4;
			default:
				return 1;
		}
	};

	const renderProgressIndicator = () => {
		const currentStep = getStepNumber(state.step);
		const totalSteps = 4;

		return (
			<div className="mb-6 flex justify-center">
				<div className="flex space-x-2">
					{Array.from({ length: totalSteps }, (_, index) => (
						<div
							key={index}
							className={`h-2 w-8 rounded ${
								index + 1 <= currentStep ? 'bg-violet-600' : 'bg-gray-300'
							}`}
						/>
					))}
				</div>
			</div>
		);
	};

	const renderStep = () => {
		const stepProps = {
			state,
			onNext: updateState,
		};

		switch (state.step) {
			case 'EMAIL':
				return <EmailStep {...stepProps} />;
			case 'CODE_VERIFICATION':
				return <CodeVerificationStep {...stepProps} />;
			case 'RESET_PASSWORD':
				return <ResetPasswordStep {...stepProps} />;
			case 'SUCCESS':
				return <SuccessStep />;
			default:
				return <EmailStep {...stepProps} />;
		}
	};

	return (
		<div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
			<div className="xs:p-0 mx-auto p-10 md:w-full lg:w-2/3 xl:w-1/2">
				{/* Header with logo */}
				<div className="mb-5 flex items-center justify-center">
					<div
						onClick={() => navigate(Path.HOME_PAGE)}
						className="cursor-pointer"
					>
						<MainIcon />
					</div>
				</div>

				{/* Main card */}
				<div className="w-full rounded-2xl bg-white shadow">
					<div className="px-10 py-10">
						{/* Progress indicator (hide on success step) */}
						{state.step !== 'SUCCESS' && renderProgressIndicator()}

						{/* Step content */}
						{renderStep()}
					</div>
				</div>

				{/* Back button (hide on success step) */}
				{state.step !== 'SUCCESS' && (
					<div className="py-5">
						<div className="grid grid-cols-1">
							<div className="text-center">
								<AOutlineButton onClick={goBack}>
									<FontAwesomeIcon icon={faArrowLeft} />
									<span className="ml-1 inline-block">
										{t('forgotPassword.getBackToLogin')}
									</span>
								</AOutlineButton>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
