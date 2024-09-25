import { Card, CardContent } from "@/components/ui/card";
import { type Comment } from "@/drizzle/schema/comment";
import {
  ShoutCommentCreatedAt,
  ShoutCommentOption,
  ShoutMessage,
  ShoutUser,
  ShoutUserPhoto,
} from "@/features/shouts/components";
import { FC } from "react";

type ShoutCommentCardProps = {
  comment: Comment;
};

const ShoutCommentCard: FC<ShoutCommentCardProps> = ({ comment }) => {
  return (
    <Card className="rounded-none border-b-0 border-x-0 last:border-b-1 p-0">
      <CardContent className="flex items-start gap-4 py-4 px-0">
        <ShoutUserPhoto
          hasImage={comment.user?.hasImage}
          imageUrl={comment.user?.imageUrl}
        />
        <div className="flex-1 flex flex-col items-stretch justify-start gap-1">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center justify-start gap-1">
              <ShoutUser
                username={comment.user?.username}
                firstName={comment.user?.firstName}
                lastName={comment.user?.lastName}
                isAnonymous={false}
              />
              <ShoutCommentCreatedAt createdAt={comment.createdAt} />
            </div>
            <ShoutCommentOption
              commentId={comment.id}
              shoutId={comment.shoutId}
              userId={comment.userId}
            />
          </div>
          <ShoutMessage message={comment.message} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoutCommentCard;
