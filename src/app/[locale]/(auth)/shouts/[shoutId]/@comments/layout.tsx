import { ShoutCommentStoreProvider } from "@/features/shouts/store-provider/ShoutCommentProvider";
import { getCommentsByShoutIdUseCase } from "@/features/shouts/use-cases/comment";

export default async function CommentsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    shoutId: string;
  };
}) {
  const { comments, counts, limit } = await getCommentsByShoutIdUseCase(
    params.shoutId
  );

  return (
    <div className="flex flex-col">
      <ShoutCommentStoreProvider value={{ comments, counts, limit }}>
        {children}
      </ShoutCommentStoreProvider>
    </div>
  );
}
