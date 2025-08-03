import { create } from 'zustand';
import { createAuthen, TAuthenSlice } from './authenSlice';
import { createCat, TCatSlice } from './CatSlice';
import { createFollow, TFollowSlice } from './followSlice';
import { devtools } from 'zustand/middleware';

export type TBoundStore = {
	authen: TAuthenSlice;
	cat: TCatSlice;
	follow: TFollowSlice;
};

export const useBoundStore = create<TBoundStore>()(
	devtools((...args) => ({
		authen: createAuthen(...args),
		cat: createCat(...args),
		follow: createFollow(...args),
	}))
);
