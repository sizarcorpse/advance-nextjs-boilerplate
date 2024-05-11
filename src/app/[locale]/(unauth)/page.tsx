import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/LocaleSwitcher";

import Heading from "@/components/Heading";

export default function XPage() {
  const t = useTranslations("welcome");

  return (
    <>
      <h1>{t("title")}</h1>
      <p>{t("content")}</p>
      <LocaleSwitcher />

      <Heading>Click me</Heading>
    </>
  );
}
