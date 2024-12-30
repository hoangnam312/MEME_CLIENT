import { t } from 'i18next';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import AButton from 'src/component/atoms/AButton/AButton';
import { Path } from 'src/constants/type';
import { useBoundStore } from 'src/store/store';

export interface ORequiredAuthenPropsType {
	children: ReactNode;
}

const OBlurRequiredAuthen = ({ children }: ORequiredAuthenPropsType) => {
	const { sessionToken } = useBoundStore((state) => state.authen);
	const navigate = useNavigate();

	if (!sessionToken) {
		return (
			<div className="relative">
				{children}
				<div className="absolute left-0 top-0 h-full w-full rounded-lg backdrop-blur-sm">
					<div className="flex h-full items-center justify-center">
						<div className="flex flex-col">
							<div className="flex justify-center text-xl font-semibold text-violet-900">
								{t('requireLogin')}
							</div>
							<div className="my-5 flex justify-evenly">
								<AButton
									onClick={() => navigate(Path.LOGIN)}
									content={t('login')}
								/>
								<AButton
									onClick={() => navigate(Path.REGISTER)}
									content={t('register')}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return children;
};

export default OBlurRequiredAuthen;
