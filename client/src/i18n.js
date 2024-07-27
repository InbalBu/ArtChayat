// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "navbar": {
        "about": "About",
        "shoshi": "Shoshi Hayat",
        "jacob": "Jacob Hayat",
        "gallery": "Gallery",
        "contact": "Contact",
        "biography": "Biography",
        "exhibitions": "Exhibitions",
        "switchLanguage": "Switch to Hebrew"
      }
    }
  },
  he: {
    translation: {
      "navbar": {
        "about": "אודות",
        "shoshi": "שושי חייט",
        "jacob": "יעקב חייט",
        "gallery": "גלריה",
        "contact": "צור קשר",
        "biography": "ביוגרפיה",
        "exhibitions": "תערוכות",
        "switchLanguage": "Switch to English"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
