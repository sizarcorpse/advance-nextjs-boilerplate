import { SignUp } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

import { getI18nPath } from "@/utils/helpers";

export async function generateMetadata() {
  const t = await getTranslations("meta_sign_up_page");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const SignUpPage = (props: { params: { locale: string } }) => (
  <SignUp path={getI18nPath("/sign-up", props.params.locale)} />
);

export default SignUpPage;
