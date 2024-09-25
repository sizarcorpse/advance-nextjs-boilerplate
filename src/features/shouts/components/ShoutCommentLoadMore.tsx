"use client";

import { Button } from "@/components/ui/button";
import { loadMoreCommentsAction } from "@/features/shouts/actions/comment";
import { useShoutCommentStore } from "@/features/shouts/store-provider/ShoutCommentProvider";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useServerAction } from "zsa-react";

const ShoutCommentLoadMore = () => {
  const t = useTranslations("shout_comments");
  const { shoutId } = useParams() as { shoutId: string };
  const { addComments } = useShoutCommentStore((store) => store);
  const { execute, isPending } = useServerAction(loadMoreCommentsAction);
  const [page, setPage] = useState(1);

  const handleLoadMore = async () => {
    try {
      const [data, error] = await execute({ shoutId, page: page + 1 });

      if (error || !data) {
        return;
      }

      addComments(data.comments);

      setPage((prev) => prev + 1);
    } catch (error) {
      return;
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleLoadMore} disabled={isPending} variant="secondary">
        {t("load_more_button")}
      </Button>
    </div>
  );
};

export default ShoutCommentLoadMore;
