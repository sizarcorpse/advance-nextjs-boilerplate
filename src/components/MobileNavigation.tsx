import GetStartedButton from "@/components/GetStartedButton";
import Svg from "@/components/Svg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/libs/utils";
import { ExternalLink, PanelLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { forwardRef } from "react";

const MobileNavigation = async () => {
  const t = await getTranslations("public-navigation");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-4 pt-10 w-11/12 rounded-r-lg sm:w-[540px] grid grid-cols-2"
      >
        <div className="col-span-2 space-y-4">
          <Title>{t(`projects.label`)}</Title>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {Array.from({ length: Number(t(`projects.counts`)) }).map(
                (_, key) => (
                  <CarouselItem key={key} className="basis-1/2">
                    <ProjectItem
                      title={t(`projects.data.${key}.title` as any)}
                      href={t(`projects.data.${key}.href` as any)}
                      image={t(`projects.data.${key}.image` as any)}
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="col-span-2 space-y-4">
          <Title>{t(`learning.label`)}</Title>
          <div>
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
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <a
            href={t(`official-website.href`)}
            target="_blank"
            className="flex items-center justify-between text-base font-semibold leading-none"
          >
            {t(`official-website.label`)}
            <ExternalLink className="inline-block w-4 h-4 ml-2" />
          </a>
          <a
            href={t(`github.href`)}
            target="_blank"
            className="flex items-center justify-between text-base font-semibold leading-none"
          >
            {t(`github.label`)}
            <ExternalLink className="inline-block w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="col-span-2">
          <GetStartedButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Title = forwardRef<
  React.ElementRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn("text-base font-semibold leading-none", className)}
      {...props}
    >
      {children}
    </h3>
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
    <a
      ref={ref}
      target="_blank"
      className={cn(
        "group relative block select-none leading-none no-underline outline-none rounded-md overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="w-full h-full relative aspect-square">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="absolute w-full bottom-0 left-0 text-sm font-normal leading-none px-2 py-2 rounded-b-md overflow-hidden backdrop-blur-sm">
        <p className="text-sm w-full inline-flex items-center justify-between">
          {title}
          <ExternalLink className="inline-block w-4 h-4" />
        </p>
      </div>
    </a>
  );
});

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon: string;
  }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
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
  );
});

ListItem.displayName = "ListItem";
Title.displayName = "Title";
ProjectItem.displayName = "ProjectItem";

export default MobileNavigation;
