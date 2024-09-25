"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createShoutLikeAction } from "@/features/shouts/actions/like";
import { cn } from "@/libs/utils";
import { Heart } from "lucide-react";
import { FC, MouseEvent, useOptimistic, useTransition } from "react";
import { useServerAction } from "zsa-react";

type ShoutLikeProps = {
  shoutId: string;
  likeCount: number;
  isLiked: boolean;
};

const ShoutLike: FC<ShoutLikeProps> = ({ shoutId, likeCount, isLiked }) => {
  const { execute } = useServerAction(createShoutLikeAction);
  const [_, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic({ likeCount, isLiked });
  const { toast } = useToast();

  const handleLike = (e: MouseEvent) => {
    e.preventDefault();

    startTransition(() => {
      setOptimistic((prev) => ({
        likeCount: prev.likeCount + (prev.isLiked ? -1 : 1),
        isLiked: !prev.isLiked,
      }));
      runAction();
    });
  };

  const runAction = async () => {
    try {
      const [_, error] = await execute({ shoutId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like the shout",
      });
    }
  };

  return (
    <div className="flex items-center flex-1">
      <Button
        className={cn(
          "rounded-full border-none size-8 p-0 hover:bg-pink-600/20 hover:text-pink-600",
          optimistic.isLiked && "text-pink-600 "
        )}
        variant="outline"
        onClick={(e) => {
          handleLike(e);
        }}
      >
        <Heart className="size-4" />
      </Button>
      {optimistic.likeCount > 0 && (
        <span
          className={cn(
            `text-xs leading-4`,
            optimistic.isLiked && "text-pink-600"
          )}
        >
          {optimistic.likeCount}
        </span>
      )}
    </div>
  );
};

export default ShoutLike;
