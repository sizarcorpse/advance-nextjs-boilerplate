import { Separator } from "@/components/ui/separator";
import { type Shout } from "@/drizzle/schema/shout";
import {
  ShoutAttachment,
  ShoutComment,
  ShoutCreatedAt,
  ShoutLike,
  ShoutMessage,
  ShoutUser,
  ShoutUserPhoto,
  ShoutView,
} from "@/features/shouts/components";
import { FC } from "react";

type ShoutContentProps = {
  shout: Shout;
};

const ShoutContent: FC<ShoutContentProps> = ({ shout }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-start gap-2">
        <ShoutUserPhoto
          hasImage={shout.user.hasImage}
          imageUrl={shout.user.imageUrl}
          isAnonymous={shout.isAnonymous}
        />
        <ShoutUser
          firstName={shout.user.firstName}
          lastName={shout.user.lastName}
          username={shout.user.username}
          isAnonymous={shout.isAnonymous}
          className="flex-col items-start gap-0.5 leading-4"
        />
      </div>
      <ShoutMessage message={shout.message} />
      <ShoutAttachment attachments={shout.attachments} />
      <ShoutCreatedAt createdAt={shout.createdAt} formatter="full" />
      <div className="space-y-2.5">
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <ShoutLike
            likeCount={shout.likesCount}
            isLiked={shout.isLiked}
            shoutId={shout.id}
          />
          <ShoutView viewCount={shout.viewsCount} />
          <ShoutComment commentCount={shout.commentsCount} />
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default ShoutContent;
