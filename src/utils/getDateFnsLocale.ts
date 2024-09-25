import { enUS, es, fr } from "date-fns/locale";
import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { cache } from "react";

export const getDateFnsLocale = cache(async () => {
  const locale = await getLocale();

  if (locale === "fr") {
    return fr;
  }

  if (locale === "es") {
    return es;
  }

  return enUS;
});

export const useGetDateFnsLocale = () => {
  const locale = useLocale();

  if (locale === "fr") {
    return fr;
  }

  if (locale === "es") {
    return es;
  }

  return enUS;
};
