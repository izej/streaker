import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./en.json";
import pl from "./pl.json";

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const fallback = { languageTag: "en", isRTL: false };

const best = Localization.getLocales()[0] || fallback;

i18n
  .use(initReactI18next)
  .init({
    // lng: best.languageTag,
    lng: "en",
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
