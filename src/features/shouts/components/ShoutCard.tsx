import { Card, CardContent } from "@/components/ui/card";
import { type Shout } from "@/drizzle/schema/shout";
import {
  ShoutComment,
  ShoutCreatedAt,
  ShoutLike,
  ShoutMessage,
  ShoutUser,
  ShoutUserPhoto,
  ShoutView,
} from "@/features/shouts/components";
import Link from "next/link";
import { FC } from "react";

type ShoutCardProps = {
  shout: Shout;
};

const ShoutCard: FC<ShoutCardProps> = ({ shout }) => {
  return (
    <Card className="rounded-none first:rounded-t-lg border-b-0 last:border-b-1 last:rounded-b-lg p-0">
      <Link href={`/shouts/${shout.id}`}>
        <CardContent className="flex gap-2 p-4">
          <ShoutUserPhoto
            hasImage={shout.user.hasImage}
            imageUrl={shout.user.imageUrl}
            isAnonymous={shout.isAnonymous}
          />
          <div className="flex-1 flex flex-col items-stretch gap-2">
            <div className="flex-1 flex items-center gap-1">
              <ShoutUser
                firstName={shout.user.firstName}
                lastName={shout.user.lastName}
                username={shout.user.username}
                isAnonymous={shout.isAnonymous}
              />
              <ShoutCreatedAt createdAt={shout.createdAt} />
            </div>
            <ShoutMessage message={shout.message} />
            <div className="flex items-center justify-between">
              <ShoutLike
                shoutId={shout.id}
                likeCount={shout.likesCount}
                isLiked={shout.isLiked}
              />
              <ShoutView viewCount={shout.viewsCount} />
              <ShoutComment commentCount={shout.commentsCount} />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ShoutCard;
