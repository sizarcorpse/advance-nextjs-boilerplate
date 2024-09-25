import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileLoading() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Skeleton className="rounded-lg w-full mw-[600px] aspect-square" />
      <div className="space-y-2">
        <Skeleton className="w-40 h-7 rounded-md" />
        <Skeleton className="w-28 h-5 rounded-md" />
      </div>

      <Separator />
      <div className="grid grid-cols-4 gap-1">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center flex-1 gap-1 rounded-lg">
                <Skeleton className="size-4 rounded-md" />
                <Skeleton className="h-4 w-12 rounded-md" />
              </div>
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          ))}
      </div>
      <Separator />
    </div>
  );
}
