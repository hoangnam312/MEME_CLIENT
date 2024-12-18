import { create } from 'zustand';
import { createAuthen, TAuthenSlice } from './authenSlice';
import { createCat, TCatSlice } from './CatSlice';
import { devtools } from 'zustand/middleware';

export type TBoundStore = {
	authen: TAuthenSlice;
	cat: TCatSlice;
};

export const useBoundStore = create<TBoundStore>()(
	devtools((...args) => ({
		authen: createAuthen(...args),
		cat: createCat(...args),
	}))
);
