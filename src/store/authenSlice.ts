import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';

type TStateAuthenSlice = {
	password: string;
	salt: string;
	sessionToken: string;
};

type TActionAuthenSlice = {
	updateAuthen: (authen: TStateAuthenSlice) => void;
};

export type TAuthenSlice = TStateAuthenSlice & TActionAuthenSlice;

export const createAuthen: StateCreator<TBoundStore, [], [], TAuthenSlice> = (
	set
) => ({
	password: '',
	salt: '',
	sessionToken: '',
	updateAuthen: (authen) =>
		set(
			produce((draft: TBoundStore) => {
				draft.authen = { ...draft.authen, ...authen };
			})
		),
});
