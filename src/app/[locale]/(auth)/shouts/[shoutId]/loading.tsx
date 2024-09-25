import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShoutLoading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-start gap-2">
        <Skeleton className="size-10 rounded-sm" />
        <div className="flex flex-col items-start justify-start gap-1">
          <Skeleton className="w-24 h-4 rounded-sm" />
          <Skeleton className="w-20 h-3.5 rounded-sm" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-4 rounded-sm" />
        <Skeleton className="w-full h-16 rounded-sm" />
        <Skeleton className="w-full h-8 rounded-sm" />
      </div>
      <Skeleton className="w-24 h-4 rounded-sm" />

      <div className="space-y-2.5">
        <Separator />
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
        <Separator />
      </div>
    </div>
  );
}
