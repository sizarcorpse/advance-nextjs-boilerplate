"use client";

import Svg from "@/components/Svg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/libs/utils";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";
import { forwardRef } from "react";

const Navigation = () => {
  const t = useTranslations("public-navigation");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t(`projects.label`)}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
              {Array.from({ length: Number(t(`projects.counts`)) }).map(
                (_, key) => (
                  <ProjectItem
                    key={key}
                    title={t(`projects.data.${key}.title` as any)}
                    href={t(`projects.data.${key}.href` as any)}
                    image={t(`projects.data.${key}.image` as any)}
                  >
                    {t(`projects.data.${key}.description` as any)}
                  </ProjectItem>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t(`learning.label`)}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {Array.from({ length: Number(t(`learning.counts`)) }).map(
                (_, key) => (
                  <ListItem
                    key={key}
                    title={t(`learning.data.${key}.title` as any)}
                    href={t(`learning.data.${key}.href` as any)}
                    icon={t(`learning.data.${key}.icon` as any)}
                  >
                    {t(`learning.data.${key}.description` as any)}
                  </ListItem>
                )
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <a href={t(`official-website.href`)} target="_blank">
              {t(`official-website.label`)}
              <ExternalLink className="inline-block w-4 h-4 ml-2" />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
            <a href={t(`github.href`)} target="_blank">
              {t(`github.label`)}
              <ExternalLink className="inline-block w-4 h-4 ml-2" />
            </a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;

export const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon: string;
  }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          target="_blank"
          className={cn(
            "block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-start justify-start gap-2">
            <div className="bg-secondary p-3 rounded-md">
              <Svg url={icon} className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold w-full inline-flex items-center gap-2">
                {title}
                <ExternalLink className="inline-block w-4 h-4" />
              </p>
              <p className="text-xs line-clamp-2 leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

const ProjectItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    image: string;
  }
>(({ className, title, image, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group relative block select-none leading-none no-underline outline-none transition-colors rounded-md overflow-hidden",
            className
          )}
          target="_blank"
          {...props}
        >
          <div className="w-full h-full relative aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover mix-blend-luminosity group-hover:mix-blend-normal"
            />
          </div>
          <div className="absolute w-full bottom-0 left-0 text-sm font-semibold leading-none px-3 py-3 rounded-b-md overflow-hidden bg-secondary/20 backdrop-blur-sm flex flex-col justify-start items-start gap-1 ">
            <p className="text-sm w-full inline-flex items-center justify-between">
              {title}
              <ExternalLink className="w-4 h-4" />
            </p>
            <p className="text-xs line-clamp-2 text-muted-foreground scale-0 h-0 opacity-0 translate-y-20 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out group-hover:h-12 group-hover:scale-100">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ProjectItem.displayName = "ProjectItem";
ListItem.displayName = "ListItem";
