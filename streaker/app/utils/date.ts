import { enUS, pl } from "date-fns/locale";
import i18n from "@/i18n";

const localeMap: Record<string, Locale> = {
  en: enUS,
  pl: pl,
};

export function getCurrentLocale(): Locale {
  return localeMap[i18n.language] || enUS;
}