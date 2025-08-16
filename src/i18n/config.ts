import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json';
import enDashboard from '../locales/en/dashboard.json';
import enContent from '../locales/en/content.json';
import enTimeline from '../locales/en/timeline.json';
import enResources from '../locales/en/resources.json';
import frCommon from '../locales/fr/common.json';
import frDashboard from '../locales/fr/dashboard.json';
import frContent from '../locales/fr/content.json';
import frTimeline from '../locales/fr/timeline.json';
import frResources from '../locales/fr/resources.json';

const resources = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    content: enContent,
    timeline: enTimeline,
    resources: enResources,
  },
  fr: {
    common: frCommon,
    dashboard: frDashboard,
    content: frContent,
    timeline: frTimeline,
    resources: frResources,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    defaultNS: 'common',
    ns: ['common', 'dashboard', 'content', 'timeline', 'resources'],
  });

export default i18n;