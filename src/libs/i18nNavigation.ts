import { AppConfig } from "@/utils/config";
import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";

export const pathnames = {
  "/": "/",

  "/terms-of-service": {
    en: "/terms-of-service",
    es: "/terminos-de-servicio",
    fr: "/conditions-d-utilisation",
  },

  "/privacy-policy": {
    en: "/privacy-policy",
    es: "/politica-de-privacidad",
    fr: "/politique-de-confidentialite",
  },

  "/license": {
    en: "/license",
    es: "/licencia",
    fr: "/licence",
  },
} satisfies Pathnames<typeof AppConfig.locales>;

export type AppPathnames = keyof typeof pathnames;

// export const { usePathname, useRouter } = createSharedPathnamesNavigation({
//   locales: AppConfig.locales,
//   localePrefix: AppConfig.localePrefix,
// });

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales: AppConfig.locales,
    localePrefix: AppConfig.localePrefix,
    pathnames,
  });
