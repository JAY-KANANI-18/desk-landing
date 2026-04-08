import en from "./locales/en";
import es from "./locales/es";
import ar from "./locales/ar";

export const supportedLocales = ["en", "es", "ar", "fr", "pt", "de", "it"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];
export const enableMultilanguage = false;

export const rtlLocales: SupportedLocale[] = ["ar"];

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  pt: "Português",
  de: "Deutsch",
  it: "Italiano",
};

type Messages = Record<string, string>;

export const messages: Record<SupportedLocale, Messages> = {
  en,
  es: { ...en, ...es },
  ar: { ...en, ...ar },
  fr: { ...en },
  pt: { ...en },
  de: { ...en },
  it: { ...en },
};
