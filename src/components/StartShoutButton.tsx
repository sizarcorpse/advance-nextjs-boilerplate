import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const StartShoutButton = async () => {
  const t = await getTranslations("start_shouting_button");
  return (
    <Button asChild>
      <Link href="/shouts">
        {t("label")}
        <Zap className="w-4 h-4 ml-2" />
      </Link>
    </Button>
  );
};

export default StartShoutButton;
