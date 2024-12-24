import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';

type TStateAuthenSlice = {
	email: string;
	username: string;
	password: string;
	salt: string;
	sessionToken: string;
	userId: string;
	v: string;
};

type TActionAuthenSlice = {
	updateAuthen: (authen: TStateAuthenSlice) => void;
};

export type TAuthenSlice = TStateAuthenSlice & TActionAuthenSlice;

export const createAuthen: StateCreator<TBoundStore, [], [], TAuthenSlice> = (
	set
) => ({
	email: '',
	username: '',
	password: '',
	salt: '',
	sessionToken: '',
	userId: '',
	v: '',
	updateAuthen: (authen) =>
		set(
			produce((draft: TBoundStore) => {
				draft.authen = { ...draft.authen, ...authen };
			})
		),
});
