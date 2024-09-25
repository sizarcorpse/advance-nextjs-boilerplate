"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw, RotateCw, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";

type ErrorComponentProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorComponent: FC<ErrorComponentProps> = ({ reset }) => {
  const router = useRouter();
  const t = useTranslations("error_component");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-xl font-bold md:text-2xl">{t("title")}</h2>
        <p>{t("description")}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => reset()}>
          {t("reset_button")}
          <RotateCw className="size-4 ml-2" />
        </Button>
        <Button onClick={() => router.refresh()}>
          {t("refresh_button")}
          <RefreshCcw className="size-4 ml-2" />
        </Button>
        <Button onClick={() => router.back()}>
          {t("go_back_button")}
          <Undo2 className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ErrorComponent;
