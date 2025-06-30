export type StepType =
	| 'EMAIL'
	| 'CODE_VERIFICATION'
	| 'RESET_PASSWORD'
	| 'SUCCESS';

export interface ForgotPasswordState {
	step: StepType;
	email: string;
	code: string;
	timer: number;
	attempts: number;
	isLocked: boolean;
	canResend: boolean;
}

export interface StepProps {
	state: ForgotPasswordState;
	onNext: (updates: Partial<ForgotPasswordState>) => void;
	onBack?: () => void;
}
