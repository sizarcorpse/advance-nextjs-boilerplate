"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCommentAction } from "@/features/shouts/actions/comment";
import { useAuth } from "@clerk/nextjs";
import { EllipsisVertical, Flag, Trash2 } from "lucide-react";
import { FC } from "react";
import { useServerAction } from "zsa-react";

type ShoutCommentOptionProps = {
  commentId: string;
  shoutId: string;
  userId: string;
};

const ShoutCommentOption: FC<ShoutCommentOptionProps> = ({
  commentId,
  shoutId,
  userId,
}) => {
  const { execute } = useServerAction(deleteCommentAction);
  const { userId: cu } = useAuth();

  const handleDeleteComment = async () => {
    const [_, error] = await execute({ commentId, shoutId });

    if (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-primary/10 p-1 rounded-full text-foreground/60">
        <EllipsisVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-48">
        {userId === cu && (
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={handleDeleteComment}
          >
            <Trash2 className="size-4 mr-2 flex" />
            Delete Comment
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="font-light" disabled>
          <Flag className="size-4 mr-2 flex" />
          Report Comment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShoutCommentOption;
