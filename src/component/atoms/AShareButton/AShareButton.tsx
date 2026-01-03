import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import AButton from '../AButton/AButton';

export interface AShareButtonProps {
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
	isDisabled?: boolean;
	addClass?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'minimal' | 'outline';
}

const AShareButton = ({
	onClick,
	isDisabled = false,
	addClass = '',
	size = 'md',
	variant = 'default',
}: AShareButtonProps) => {
	const sizeClasses = {
		sm: '!px-3 !py-1.5 !text-xs',
		md: '!px-5 !py-2 !text-sm',
		lg: '!px-6 !py-3 !text-base',
	};

	const variantClasses = {
		default: '',
		minimal: '!bg-transparent !text-violet-900 hover:!bg-violet-100',
		outline: '!bg-transparent !border-2 !border-violet-900 !text-violet-900',
	};

	return (
		<AButton
			onClick={onClick}
			isDisabled={isDisabled}
			addClass={`${sizeClasses[size]} ${variantClasses[variant]} ${addClass}`}
		>
			<FontAwesomeIcon icon={faShareNodes} />
		</AButton>
	);
};

export default AShareButton;
