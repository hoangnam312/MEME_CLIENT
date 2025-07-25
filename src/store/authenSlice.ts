import { StateCreator } from 'zustand';
import { TBoundStore } from './store';
import { produce } from 'immer';
import {
	UserPreferences,
	UserProfile,
	UserStats,
	UserTimestamps,
} from 'src/constants/auth.type';

type TStateAuthenSlice = {
	userId: string;
	username: string;
	email: string;
	profile?: UserProfile;
	stats: UserStats;
	preferences: UserPreferences;
	timestamps: UserTimestamps;
	token: string;
};

type TAuthenUpdate = {
	userId?: string;
	username?: string;
	email?: string;
	profile?: UserProfile;
	stats?: UserStats;
	preferences?: UserPreferences;
	timestamps?: UserTimestamps;
	token?: string;
};

type TActionAuthenSlice = {
	updateAuthen: (authen: TAuthenUpdate) => void;
};

export type TAuthenSlice = TStateAuthenSlice & TActionAuthenSlice;

export const createAuthen: StateCreator<TBoundStore, [], [], TAuthenSlice> = (
	set
) => ({
	userId: '',
	username: '',
	email: '',
	profile: undefined,
	stats: {
		followersCount: 0,
		followingCount: 0,
		memesCount: 0,
	},
	preferences: {
		contentLanguage: 'en',
	},
	timestamps: {
		createdAt: '',
		updatedAt: '',
	},
	token: '',
	updateAuthen: (authen) =>
		set(
			produce((draft: TBoundStore) => {
				draft.authen = { ...draft.authen, ...authen };
			})
		),
});
