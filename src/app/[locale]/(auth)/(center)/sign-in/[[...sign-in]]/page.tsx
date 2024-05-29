import { getI18nPath } from "@/utils/helpers";
import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("meta_sing_in_page");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const SignInPage = (props: { params: { locale: string } }) => (
  <SignIn path={getI18nPath("/sign-in", props.params.locale)} />
);

export default SignInPage;
