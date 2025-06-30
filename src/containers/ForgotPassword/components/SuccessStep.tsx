import React from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import AButton from 'src/component/atoms/AButton/AButton';
import { Path } from 'src/constants/type';

const SuccessStep: React.FC = () => {
	const navigate = useNavigate();

	const handleGoToLogin = () => {
		navigate(Path.LOGIN);
	};

	return (
		<div className="space-y-20 text-center">
			<div className="flex justify-center">
				<FontAwesomeIcon
					icon={faCheckCircle}
					className="text-6xl text-green-500"
				/>
			</div>

			<div>
				<h2 className="text-2xl font-semibold text-gray-900">
					{t('forgotPassword.success.title')}
				</h2>
				<p className="mt-2 text-gray-600">
					{t('forgotPassword.success.message')}
				</p>
			</div>

			<div className="flex justify-center space-y-3">
				<AButton
					content={t('forgotPassword.success.loginButton')}
					onClick={handleGoToLogin}
				/>
			</div>
		</div>
	);
};

export default SuccessStep;
