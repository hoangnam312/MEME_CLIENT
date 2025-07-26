import i18next from 'i18next';
import { UserPreferences } from 'src/constants/auth.type';

/**
 * Initialize language based on user preferences
 * Falls back to browser language or default 'en'
 */
export const initializeLanguage = async (
	preferences?: UserPreferences
): Promise<void> => {
	let targetLanguage = 'en'; // Default fallback

	if (preferences?.contentLanguage) {
		// Use user's saved preference
		targetLanguage = preferences.contentLanguage;
	} else {
		// Fallback to browser language if supported
		const browserLanguage = navigator.language.split('-')[0];
		if (['en', 'vi'].includes(browserLanguage)) {
			targetLanguage = browserLanguage;
		}
	}

	// Change i18next language
	await i18next.changeLanguage(targetLanguage);
};

/**
 * Change language and persist the preference
 */
export const changeLanguage = async (language: 'en' | 'vi'): Promise<void> => {
	await i18next.changeLanguage(language);
};

/**
 * Get supported languages
 */
export const getSupportedLanguages = (): Array<{
	code: 'en' | 'vi';
	name: string;
}> => [
	{ code: 'en', name: 'English' },
	{ code: 'vi', name: 'Tiếng Việt' },
];

/**
 * Check if language is supported
 */
export const isSupportedLanguage = (
	language: string
): language is 'en' | 'vi' => {
	return ['en', 'vi'].includes(language);
};
