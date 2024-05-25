import LocaleSwitcher from "@/components/LocaleSwitcher";
import SentryTestButton from "@/components/SentryTestButton";
import { getTranslations } from "next-intl/server";
export default async function XPage() {
  const t = await getTranslations("welcome");

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("content")}</p>
      <LocaleSwitcher />

      <SentryTestButton />
    </>
  );
}
