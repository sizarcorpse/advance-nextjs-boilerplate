import { Skeleton } from "@/components/ui/skeleton";

export default function ShoutsLoading() {
  return (
    <div className="space-y-10">
      <div className="border rounded-lg p-4 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <Skeleton className="size-10 rounded-sm" />
          <div className="flex-1 flex flex-col items-start gap-2">
            <Skeleton className="w-full h-28 rounded-sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-36 h-8 rounded-md" />
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="size-9 rounded-full" />
          </div>
          <Skeleton className="w-24 h-9 rounded-md" />
        </div>
      </div>

      <div>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div
              className="border rounded-none first:rounded-t-lg border-b-0 last:border-b-1 last:rounded-b-lg p-0"
              key={i}
            >
              <div className="flex gap-2 p-4">
                <Skeleton className="size-10 rounded-sm" />
                <div className="flex-1 flex flex-col items-stretch gap-2">
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex items-start gap-1">
                      <Skeleton className="w-24 h-4 rounded-sm" />
                      <Skeleton className="w-20 h-3.5 rounded-sm" />
                    </div>
                    <Skeleton className="w-10 h-3.5 rounded-sm" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Skeleton className="w-full h-4 rounded-sm" />
                    <Skeleton className="w-full h-16 rounded-sm" />
                    <Skeleton className="w-full h-8 rounded-sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
