import { useEffect } from 'react';
import { useBoundStore } from './store/store';
import { isEmpty } from 'lodash';
import { initializeLanguage } from './utils/languageUtils';
import useLoginWithGoogle from './containers/Login/useLoginWithGoogle';

export const App = () => {
	const { updateAuthen } = useBoundStore((state) => state.authen);
	useEffect(() => {
		const authen = JSON.parse(localStorage.getItem('authen') ?? '{}');
		if (isEmpty(authen)) {
			// Initialize language with browser preference if no user is logged in
			initializeLanguage();
			return;
		}
		updateAuthen(authen);
		// Initialize language based on stored user preferences
		initializeLanguage(authen.preferences);
	}, [updateAuthen]);
	useLoginWithGoogle();

	return null;
};
