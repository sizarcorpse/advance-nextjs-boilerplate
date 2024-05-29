"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter } from "@/libs/i18nNavigation";
import { AppConfig } from "@/utils/config";
import { useLocale } from "next-intl";

const abbreviation = {
  en: "English",
  fr: "Français",
  es: "Español",
};

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: string) => {
    router.push(pathname, { locale: event });
    router.refresh();
  };

  return (
    <Select defaultValue={locale} onValueChange={(e) => handleChange(e)}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Theme" className="pr-10" />
      </SelectTrigger>
      <SelectContent>
        {AppConfig.locales.map((elt) => (
          <SelectItem key={elt} value={elt}>
            {abbreviation[elt as keyof typeof abbreviation]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
