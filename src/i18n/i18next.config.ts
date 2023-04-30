import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from './en.json';
import vi from './vi.json';

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en },
      vi: { translations: vi },
    },
    ns: ['translations'],
})

export default i18next;