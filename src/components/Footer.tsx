import Link from "next/link";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/libs/utils";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  return (
    <div className="w-full flex items-center justify-start gap-4 px-4">
      <div className="flex justify-start items-center gap-2 grow md:grow-0">
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>

      <FooterNavigation className="hidden md:flex" />

      <SocialMediaLinks />
    </div>
  );
};

export default Footer;

export const FooterNavigation = async ({
  className,
}: {
  className?: string;
}) => {
  const t = await getTranslations("public_footer");

  return (
    <div
      className={cn(
        "items-center justify-start gap-2 grow hidden md:flex",
        className
      )}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Link
          key={index}
          href={t(`navigation.data.${index}.href` as any)}
          className="text-sm text-muted-foreground"
        >
          {t(`navigation.data.${index}.label` as any)}
        </Link>
      ))}
    </div>
  );
};

const SocialMediaLinks = async () => {
  return (
    <div className="flex items-center justify-start gap-2 md:gap-3">
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

const socials: {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "GitHub",
    href: "https://github.com/sizarcorpse",
    icon: (
      <GitHubLogoIcon className="text-primary hover:text-primary/80 size-4 md:size-5" />
    ),
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ramizimran",
    icon: (
      <LinkedInLogoIcon className="text-primary hover:text-primary/80 size-4 md:size-5" />
    ),
  },
  {
    title: "Twitter",
    href: "https://twitter.com/sizarcorpse",
    icon: (
      <TwitterLogoIcon className="text-primary hover:text-primary/80 size-4 md:size-5" />
    ),
  },
];
