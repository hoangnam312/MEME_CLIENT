import { create } from 'zustand';

type State = {
	password: string;
	salt: string;
	sessionToken: string;
};

type Action = {
	updateAuthen: (authen: State) => void;
};

export const useAuthen = create<State & Action>((set) => ({
	password: '',
	salt: '',
	sessionToken: '',
	updateAuthen: (authen) => set(() => ({ ...authen })),
}));
