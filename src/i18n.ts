import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import az from "./locales/az/translation.json";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

const SUPPORTED_LANGUAGES = ["az", "en", "ru"] as const;
const getInitialLanguage = () => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && SUPPORTED_LANGUAGES.includes(savedLang as (typeof SUPPORTED_LANGUAGES)[number])) {
        return savedLang;
    }

    const browserLang = navigator.language.split("-")[0].toLowerCase();
    if (SUPPORTED_LANGUAGES.includes(browserLang as (typeof SUPPORTED_LANGUAGES)[number])) {
        return browserLang;
    }

    return "az";
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            az: { translation: az },
            en: { translation: en },
            ru: { translation: ru }
        },
        lng: getInitialLanguage(),
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("lang", lng);
    document.documentElement.lang = lng;
});

export default i18n;