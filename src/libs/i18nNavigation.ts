import { AppConfig } from "@/utils/config";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
});
