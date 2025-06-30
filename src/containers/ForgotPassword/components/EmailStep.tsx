import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AInput from 'src/component/atoms/AInput/AInput';
import AButton from 'src/component/atoms/AButton/AButton';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { forgotPassword } from 'src/service/auth';
import {
	emailValidationSchema,
	EmailFormData,
} from '../forgotPassword.validation';
import { StepProps } from '../forgotPassword.types';
import { Path } from 'src/constants/type';

interface EmailStepProps extends Omit<StepProps, 'state'> {
	state: StepProps['state'];
}

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailFormData>({
		resolver: yupResolver(emailValidationSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: EmailFormData) => {
		try {
			await forgotPassword({ email: data.email });
			onNext({
				email: data.email,
				step: 'CODE_VERIFICATION',
				timer: 300, // 5 minutes
				attempts: 0,
				canResend: false,
			});
			toast.success(t('forgotPassword.messages.codeSent'));
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const errorMessage = error.response.data?.error || error.response.data;
				if (errorMessage.includes('not found')) {
					toast.error(t('forgotPassword.messages.emailNotFound'));
				} else if (errorMessage.includes('too many')) {
					toast.error(t('forgotPassword.messages.tooManyRequests'));
				} else {
					toast.error(errorMessage);
				}
			} else {
				toast.error(t('forgotPassword.messages.unexpectedError'));
			}
		}
	};

	return (
		<div className="space-y-20">
			<div className="text-center">
				<h2 className="text-2xl font-semibold text-gray-900">
					{t('forgotPassword.emailStep.title')}
				</h2>
				<p className="mt-2 text-gray-600">
					{t('forgotPassword.emailStep.subtitle')}
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<AInput
						type="email"
						label={t('forgotPassword.emailStep.emailLabel')}
						rest={{
							...register('email'),
							disabled: isSubmitting,
							autoFocus: true,
						}}
					/>
					{errors.email?.message && (
						<p className="mt-2 text-sm text-red-500">
							{t(errors.email.message)}
						</p>
					)}
				</div>

				<div className="flex justify-center space-y-3">
					<AButton
						content={t('forgotPassword.emailStep.sendButton')}
						rest={{
							type: 'submit',
							disabled: isSubmitting,
						}}
					/>
				</div>
			</form>

			<div className="text-center">
				<AOutlineButton onClick={() => navigate(Path.LOGIN)} addClass="text-sm">
					<FontAwesomeIcon icon={faArrowLeft} />
					<span className="ml-1 inline-block">{t('getBack')}</span>
				</AOutlineButton>
			</div>
		</div>
	);
};

export default EmailStep;
