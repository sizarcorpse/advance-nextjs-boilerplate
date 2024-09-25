"use client";

import {
  ShoutCommentCard,
  ShoutCommentLoadMore,
} from "@/features/shouts/components";
import { useShoutCommentStore } from "@/features/shouts/store-provider/ShoutCommentProvider";
import { useMemo } from "react";

const ShoutCommentCollection = () => {
  const { comments, counts } = useShoutCommentStore((store) => store);

  const hasMoreComments = useMemo(
    () => comments.length < counts,
    [comments, counts]
  );

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col items-stretch justify-start">
        {comments.map((comment, index) => (
          <ShoutCommentCard key={index} comment={comment} />
        ))}
      </div>

      {hasMoreComments && <ShoutCommentLoadMore />}
    </div>
  );
};

export default ShoutCommentCollection;
