import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';

type TStateCatSlice = {
	cat: string;
	cat2: string;
};

type TActionCatSlice = {
	updateCat: (cat: string) => void;
	updateCat2: (cat: string) => void;
};

export type TCatSlice = TStateCatSlice & TActionCatSlice;

// [['zustand/devtools', never]]: Declare a type for DevTools.
// 'cat/updateCat': The third argument is used to name the action, making it easier to debug in Redux DevTools.
export const createCat: StateCreator<
	TBoundStore,
	[['zustand/devtools', never]],
	[],
	TCatSlice
> = (set) => ({
	cat: '',
	cat2: '',
	updateCat: (cat) =>
		set(
			produce((draft: TBoundStore) => {
				draft.cat.cat = cat;
			}),
			undefined,
			'cat/updateCat'
		),
	updateCat2: (cat) =>
		set(
			produce((draft: TBoundStore) => {
				draft.cat.cat2 = cat;
			}),
			undefined,
			'cat/updateCat2'
		),
});
