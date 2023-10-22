import { useEffect, useState } from 'react';

const useFile = () => {
	const [source, setSource] = useState<string>('');

	useEffect(() => {
		return () => setSource('');
	}, []);

	const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const items = e.clipboardData.items;
		let blob = null;
		for (const item of items) {
			if (item.type.startsWith('image')) {
				blob = item.getAsFile();
			}
		}
		let newScr = '';
		if (blob !== null) {
			const reader = new FileReader();
			reader.onload = function (event) {
				if (event.target) {
					newScr = event.target.result as string;
					setSource(newScr);
				}
			};
			reader.readAsDataURL(blob);
		}
		return newScr;
	};

	const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
		console.log('onDrop ~ e:', e);
		e.preventDefault();
		e.stopPropagation();
		const files = e.dataTransfer.files;
		let newScr = '';
		if (files && files.length > 0) {
			const reader = new FileReader();
			reader.onload = function (event) {
				if (event.target) {
					newScr = event.target.result as string;
					setSource(newScr);
				}
			};
			reader.readAsDataURL(files[0]);
		}
		return newScr;
	};

	const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		let newScr = '';
		if (files && files.length > 0) {
			const reader = new FileReader();
			reader.onload = function (event) {
				if (event.target) {
					newScr = event.target.result as string;
					setSource(newScr);
				}
			};
			reader.readAsDataURL(files[0]);
		}
		return newScr;
	};

	const onDragOverAble = (e: React.DragEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	return { source, setSource, onDrop, onPaste, onUpload, onDragOverAble };
};

export default useFile;
