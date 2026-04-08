import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { localeLabels, messages, rtlLocales, supportedLocales, type SupportedLocale } from "@/i18n/messages";

export function useI18n() {
  const router = useRouter();
  const locale = (supportedLocales.includes((router.locale as SupportedLocale) ?? "en")
    ? (router.locale as SupportedLocale)
    : "en") as SupportedLocale;

  const t = useCallback(
    (key: string) => {
      return messages[locale][key] ?? messages.en[key] ?? key;
    },
    [locale]
  );

  const changeLocale = useCallback(
    async (nextLocale: SupportedLocale) => {
      await router.push(router.asPath, router.asPath, { locale: nextLocale });
    },
    [router]
  );

  const isRTL = useMemo(() => rtlLocales.includes(locale), [locale]);

  return {
    locale,
    t,
    isRTL,
    supportedLocales,
    localeLabels,
    changeLocale,
  };
}
