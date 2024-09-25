import { isCommentAllowedByShoutIdUseCase } from "@/features/shouts/use-cases/shout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default async function ShoutLayout({
  children,
  comments,
  params,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
  params: {
    shoutId: string;
  };
}) {
  const isCommentAllowed = await isCommentAllowedByShoutIdUseCase(
    params.shoutId
  );

  return (
    <div className="space-y-4">
      <div>{children}</div>
      {isCommentAllowed && <div>{comments}</div>}
    </div>
  );
}
