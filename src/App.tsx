import { useEffect } from 'react';
import { useBoundStore } from './store/store';

export const App = () => {
	const { updateAuthen } = useBoundStore((state) => state.authen);
	useEffect(() => {
		const authen = JSON.parse(localStorage.getItem('authen') ?? '');
		if (authen) {
			updateAuthen(authen);
		}
	}, [updateAuthen]);

	return null;
};
