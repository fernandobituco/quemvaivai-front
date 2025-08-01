import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPT from './locales/pt-BR/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  en: { translation: translationEN },
  'pt-BR': { translation: translationPT },
};

i18n
  .use(LanguageDetector) // detecta linguagem do navegador
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false, // react já faz isso
    },
  })

export default i18n;