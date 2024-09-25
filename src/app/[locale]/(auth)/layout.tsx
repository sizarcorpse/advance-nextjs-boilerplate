import { Footer } from "@/components";
import { AuthHeader } from "@/features/shouts/components";
import getClerkLocaleUrl from "@/utils/getClerkLocaleUrl";
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
  modal?: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = props.params;
  const { clerkLocale, signInUrl, signUpUrl, redirectUrl } =
    getClerkLocaleUrl(locale);

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInForceRedirectUrl={redirectUrl}
      signUpForceRedirectUrl={redirectUrl}
    >
      <main className="h-screen max-h-screen w-full flex flex-col bg-background text-foreground">
        <AuthHeader />
        <div className="w-full flex-grow overflow-y-auto">
          {props.children}
          {props.modal}
        </div>
        <footer className="w-full h-12 flex ">
          <Footer />
        </footer>
      </main>
    </ClerkProvider>
  );
}
