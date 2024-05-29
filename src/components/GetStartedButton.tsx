import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const GetStartedButton = async () => {
  const t = await getTranslations("get_started_button");
  return (
    <Button asChild>
      <Link href="/sign-in">
        {t("label")}
        <Rocket className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  );
};

export default GetStartedButton;
