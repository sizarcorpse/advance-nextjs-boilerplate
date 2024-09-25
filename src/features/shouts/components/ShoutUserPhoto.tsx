import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FC } from "react";

type ShoutUserPhotoProps = {
  hasImage?: boolean;
  imageUrl?: string;
  isAnonymous?: boolean;
};

const ShoutUserPhoto: FC<ShoutUserPhotoProps> = ({ hasImage, imageUrl }) => {
  return (
    <Avatar className="rounded-sm">
      {hasImage && (
        <AvatarImage src={imageUrl} asChild className="object-cover">
          <Image
            src={imageUrl as string}
            alt="User Avatar"
            width={40}
            height={40}
          />
        </AvatarImage>
      )}
      <AvatarFallback className="animate-pulse"></AvatarFallback>
    </Avatar>
  );
};

export default ShoutUserPhoto;
