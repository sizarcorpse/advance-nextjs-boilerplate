import { cn } from "@/libs/utils";
import Link from "next/link";
import { FC } from "react";

type ShoutUserProps = {
  firstName: string;
  lastName: string;
  username: string;
  isAnonymous: boolean;
  className?: string;
};

const ShoutUser: FC<ShoutUserProps> = ({
  firstName,
  lastName,
  username,
  isAnonymous,
  className,
}) => {
  if (isAnonymous) {
    return <div className="font-medium">Anonymous</div>;
  }

  return (
    <Link
      className={cn(
        `flex items-center justify-start gap-1 text-base`,
        className
      )}
      href={`/user/${username}`}
    >
      <span className="font-medium">
        {firstName} {lastName}
      </span>
      <span className="font-thin text-foreground/60 hover:text-foreground/100 transition-colors">
        @{username}
      </span>
    </Link>
  );
};

export default ShoutUser;
