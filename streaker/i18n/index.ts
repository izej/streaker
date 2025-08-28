import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import en from "./en.json";
import pl from "./pl.json";

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const fallback = { languageTag: "en", isRTL: false };

const best = RNLocalize.findBestLanguageTag(Object.keys(resources)) || fallback;

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
