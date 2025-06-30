import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';

type TStateAuthenSlice = {
	email: string;
	username: string;
	password: string;
	userId: string;
	token: string;
	bio: string;
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
	userId: '',
	token: '',
	bio: '',
	updateAuthen: (authen) =>
		set(
			produce((draft: TBoundStore) => {
				draft.authen = { ...draft.authen, ...authen };
			})
		),
});
