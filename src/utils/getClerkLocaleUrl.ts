import { enUS, esES, frFR } from "@clerk/localizations";

const getClerkLocaleUrl = (locale: string) => {
  let clerkLocale = enUS;

  let signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
  let signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
  let redirectUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL;

  if (locale === "fr") {
    clerkLocale = frFR;
  }

  if (locale === "es") {
    clerkLocale = esES;
  }

  if (locale !== "en") {
    signInUrl = `/${locale}${signInUrl}`;
    signUpUrl = `/${locale}${signUpUrl}`;
    redirectUrl = `/${locale}${redirectUrl}`;
  }

  return {
    clerkLocale,
    signInUrl,
    signUpUrl,
    redirectUrl,
  };
};

export default getClerkLocaleUrl;
