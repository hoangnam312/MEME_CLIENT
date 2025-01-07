let inMemoryToken: string | null = null;

export const getToken = () => {
	if (!inMemoryToken) {
		inMemoryToken = localStorage.getItem('token');
	}
	return inMemoryToken;
};

export const setToken = (token: string) => {
	inMemoryToken = token;
	localStorage.setItem('token', token);
};

export const clearToken = () => {
	inMemoryToken = null;
	localStorage.removeItem('token');
};
