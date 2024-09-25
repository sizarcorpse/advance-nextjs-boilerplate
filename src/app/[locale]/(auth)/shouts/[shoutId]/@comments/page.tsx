import { ShoutCommentCollection } from "@/features/shouts/components";
import { ShoutCommentForm } from "src/features/shouts/components";

const ShoutCommentsPage = async ({
  params,
}: {
  params: {
    shoutId: string;
  };
}) => {
  const { shoutId } = params;

  return (
    <div className="flex flex-col gap-4">
      <ShoutCommentForm shoutId={shoutId} />
      <ShoutCommentCollection />
    </div>
  );
};

export default ShoutCommentsPage;
