import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";

// TODO: Complete metadata
export async function generateMetadata() {
  const t = await getTranslations("meta_landing_page");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    keywords: t("meta_keywords"),
    author: t("meta_author"),
    company: t("meta_company"),
    robots: t("meta_robots"),
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  return (
    <main className="h-screen max-h-screen w-full flex flex-col bg-background text-foreground">
      <Header userLoggedIn={!!userId} />
      <div className="w-full flex-grow overflow-y-auto">{children}</div>
      <footer className="w-full h-12 flex ">
        <Footer />
      </footer>
    </main>
  );
}
