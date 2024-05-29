import ContactForm from "@/components/ContactForm";
import Packages from "@/components/Packages";
import Title from "@/components/Title";
import { getTranslations } from "next-intl/server";

export default async function LandingPage() {
  const t = await getTranslations("landing_page");

  return (
    <div className="container h-[calc(100vh-120px)] py-6 grid grid-cols-12 gap-y-10 md:gap-x-4 xl:gap-x-10">
      <div className="col-span-12 grid grid-cols-12 gap-y-10 items-center md:col-span-7">
        <div className="col-span-12 space-y-5">
          <Title className="text-center md:text-left">
            {t.rich("title", {
              br: () => <br />,
            })}
          </Title>
          <p className="font-normal text-xl text-neutral-500 dark:text-neutral-300 text-center max-w-screen-md sm:text-2xl md:text-left">
            {t("subtitle")}
          </p>
        </div>
        <div className="col-span-12">
          <Packages />
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 md:col-span-5">
        <div className="col-span-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
