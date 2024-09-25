import { Skeleton } from "@/components/ui/skeleton";

export default function ShoutCommentLoading() {
  return (
    <div>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="rounded-none border-b-0 border-x-0 last:border-b-1 p-0"
          >
            <div className="flex items-start gap-4 py-4 px-0">
              <Skeleton className="rounded-full size-10" />
              <div className="flex-1 flex flex-col items-stretch justify-start gap-4">
                <div className="flex items-center justify-start gap-1">
                  <div className="flex items-center justify-start gap-1">
                    <Skeleton className="w-28 h-6" />
                    <Skeleton className="w-24 h-6" />
                  </div>
                  <Skeleton className="w-16 h-6" />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <Skeleton className="w-full h-4 rounded-sm" />
                  <Skeleton className="w-full h-16 rounded-sm" />
                  <Skeleton className="w-full h-8 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
