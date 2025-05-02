import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { color } from 'src/config/style';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

interface ALoadingProps {
	size?: SizeProp;
	className?: string;
	isLoading?: boolean;
}

const ALoading = ({
	size = '3x',
	className = '',
	isLoading = true,
}: ALoadingProps) => {
	if (!isLoading) return null;
	return (
		<FontAwesomeIcon
			icon={faSpinner}
			spin
			size={size}
			className={className}
			style={{ color: color.text }}
		/>
	);
};

export default ALoading;
