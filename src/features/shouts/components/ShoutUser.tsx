import { cn } from "@/libs/utils";
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
    <div
      className={cn(
        `flex items-center justify-start gap-1 text-base`,
        className
      )}
    >
      <span className="font-medium">
        {firstName} {lastName}
      </span>
      <span className="font-thin text-foreground/60">@{username}</span>
    </div>
  );
};

export default ShoutUser;
