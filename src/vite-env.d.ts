/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	readonly VITE_GOOGLE_CLIENT_ID: string;
	readonly VITE_FACEBOOK_APP_ID: string;
	readonly VITE_EXTENSION_AUTH: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
