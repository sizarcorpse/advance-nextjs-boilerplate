import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { MessageCircle } from "lucide-react";
import { FC } from "react";

type ShoutCommentProps = {
  commentCount: number;
};

const ShoutComment: FC<ShoutCommentProps> = ({ commentCount }) => {
  return (
    <div className="flex items-center justify-end flex-1">
      <Button
        className={cn(
          "rounded-full border-none size-8 p-0 hover:bg-cyan-600/20 hover:text-cyan-600"
        )}
        variant="outline"
      >
        <MessageCircle className="size-4" />
      </Button>
      {commentCount > 0 && (
        <span className="text-xs leading-4">{commentCount}</span>
      )}
    </div>
  );
};

export default ShoutComment;
