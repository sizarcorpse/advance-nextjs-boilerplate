import { enUS, esES, frFR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta_sing_in_page");

  return {
    author: t("meta_author"),
    keywords: t("meta_keywords"),
    company: t("meta_company"),
    robots: t("meta_robots"),
  };
}

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let clerkLocale = enUS;
  let signInUrl = "/sign-in";
  let signUpUrl = "/sign-up";
  let dashboardUrl = "/dashboard";

  if (props.params.locale === "fr") {
    clerkLocale = frFR;
  }
  if (props.params.locale === "es") {
    clerkLocale = esES;
  }

  if (props.params.locale !== "en") {
    signInUrl = `/${props.params.locale}${signInUrl}`;
    signUpUrl = `/${props.params.locale}${signUpUrl}`;
    dashboardUrl = `/${props.params.locale}${dashboardUrl}`;
  }

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInForceRedirectUrl={dashboardUrl}
      signUpForceRedirectUrl={dashboardUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
