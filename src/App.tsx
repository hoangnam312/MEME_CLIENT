import { useEffect } from 'react';
import { useBoundStore } from './store/store';
import { isEmpty } from 'lodash';

export const App = () => {
	const { updateAuthen } = useBoundStore((state) => state.authen);
	useEffect(() => {
		const authen = JSON.parse(localStorage.getItem('authen') ?? '{}');
		console.log('🚀 ~ useEffect ~ authen:', authen);
		if (isEmpty(authen)) return;
		updateAuthen(authen);
	}, [updateAuthen]);

	return null;
};
