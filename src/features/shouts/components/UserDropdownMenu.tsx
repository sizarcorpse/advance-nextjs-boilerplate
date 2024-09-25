"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Settings, User } from "lucide-react";

const UserName = ({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName: string;
  username: string;
}) => {
  return (
    <span className="flex flex-col w-full px-2 py-1">
      <span className="font-medium text-base text-primary leading-4 line-clamp-1">
        {firstName} {lastName}
      </span>
      <span className="font-thin text-foreground/80 text-sm line-clamp-1">
        @{username}
      </span>
    </span>
  );
};

const UserDropdownMenu = () => {
  const { user } = useUser();
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-full cursor-pointer size-9">
          <AvatarImage src={user?.imageUrl} asChild className="object-cover">
            <Image
              src={user?.imageUrl as string}
              alt="User Avatar"
              width={36}
              height={36}
            />
          </AvatarImage>
          <AvatarFallback className="animate-pulse"></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-2">
        <DropdownMenuLabel asChild>
          <UserName
            firstName={user?.firstName as string}
            lastName={user?.lastName as string}
            username={user?.username as string}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link
            href={`/user/${user?.username}`}
            className="grow inline-flex gap-2 cursor-pointer"
          >
            <User size={16} />

            {t("user_dropdown.profile")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={`/user/${user?.username}/account`}
            className="grow inline-flex gap-2 cursor-pointer"
          >
            <Settings size={16} />
            {t("user_dropdown.settings")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="grow inline-flex gap-2 cursor-pointer w-full">
          <LogOut size={16} />
          <SignOutButton>{t("user_dropdown.sign_out")}</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
