import { t } from 'i18next';
import { ReactNode } from 'react';
import ALoading from 'src/component/atoms/ALoading/ALoading';
import AOutlineButton from 'src/component/atoms/AOutlineButton/AOutlineButton';
import { AScrollToTopButton } from 'src/component/atoms/AScrollToTopButton/AScrollToTopButton';
import { useInfiniteScroll } from 'src/containers/MyMeme/hooks/useInfiniteScroll';
import { useScrollToTop } from 'src/containers/MyMeme/hooks/useScrollToTop';

interface ScrollConfig {
	threshold?: number;
	debounceMs?: number;
}

interface StateConfig {
	isLoading: boolean;
	hasNext: boolean;
	isEmpty?: boolean;
	error?: Error | string | null;
	isInitialLoading?: boolean;
}

interface CallbackConfig {
	onLoadMore: () => void;
	onRetry?: () => void;
}

interface CustomComponentConfig {
	loadingComponent?: ReactNode;
	endMessageComponent?: ReactNode;
	emptyComponent?: ReactNode;
	errorComponent?: ReactNode;
	skeletonComponent?: ReactNode;
}

interface FeatureConfig {
	showEndMessage?: boolean;
	showScrollToTop?: boolean;
	scrollToTopThreshold?: number;
}

interface OInfiniteScrollProps {
	children: ReactNode;
	state: StateConfig;
	callbacks: CallbackConfig;
	scroll?: ScrollConfig;
	customComponents?: CustomComponentConfig;
	features?: FeatureConfig;
}

export const OInfiniteScroll = ({
	children,
	state,
	callbacks,
	scroll = {},
	customComponents = {},
	features = {},
}: OInfiniteScrollProps) => {
	const {
		isLoading,
		hasNext,
		isEmpty = false,
		error = null,
		isInitialLoading = false,
	} = state;
	const { onLoadMore, onRetry } = callbacks;
	const { threshold, debounceMs } = scroll;
	const {
		loadingComponent,
		endMessageComponent,
		emptyComponent,
		errorComponent,
		skeletonComponent,
	} = customComponents;
	const {
		showEndMessage = true,
		showScrollToTop = true,
		scrollToTopThreshold = 300,
	} = features;

	useInfiniteScroll({
		isLoading,
		hasNext,
		onLoadMore,
		threshold,
		debounceMs,
	});

	const { showButton, scrollToTop } = useScrollToTop({
		threshold: scrollToTopThreshold,
	});

	if (isInitialLoading && skeletonComponent) {
		return <>{skeletonComponent}</>;
	}

	if (isEmpty && !isLoading) {
		return (
			emptyComponent || (
				<div className="my-8 flex flex-col items-center justify-center gap-2">
					<p className="text-sm text-gray-500">{t('common.noData')}</p>
				</div>
			)
		);
	}

	return (
		<>
			{children}
			{isLoading &&
				!isInitialLoading &&
				(loadingComponent || (
					<div className="my-4 flex justify-center">
						<ALoading isLoading={isLoading} />
					</div>
				))}
			{showEndMessage &&
				!hasNext &&
				!isLoading &&
				!isEmpty &&
				!error &&
				(endMessageComponent || (
					<div className="my-4 flex justify-center">
						<p className="text-sm text-gray-500">{t('BoardHomePage.isEnd')}</p>
					</div>
				))}
			{showScrollToTop && (
				<AScrollToTopButton show={showButton} onClick={scrollToTop} />
			)}
			{error &&
				(errorComponent || (
					<div className="my-8 flex items-center justify-center gap-4">
						<p className="text-lg text-red-500">
							{typeof error === 'string' ? error : t('common.errorOccurred')}
						</p>
						{onRetry && (
							<AOutlineButton onClick={onRetry}>
								{t('common.retry')}
							</AOutlineButton>
						)}
					</div>
				))}
		</>
	);
};
