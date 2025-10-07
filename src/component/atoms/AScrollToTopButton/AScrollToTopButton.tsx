import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import AButton from '../AButton/AButton';

interface AScrollToTopButtonProps {
	onClick: () => void;
	show: boolean;
}

export const AScrollToTopButton = ({
	onClick,
	show,
}: AScrollToTopButtonProps) => {
	if (!show) return null;

	return (
		<AButton
			onClick={onClick}
			addClass="!fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-300 shadow-lg transition-all hover:shadow-xl"
			rest={{ 'aria-label': 'Scroll to top' }}
		>
			<FontAwesomeIcon icon={faArrowUp} className="text-xl font-bold" />
		</AButton>
	);
};
