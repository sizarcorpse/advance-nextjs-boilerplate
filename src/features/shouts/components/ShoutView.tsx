import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { Activity } from "lucide-react";
import { FC } from "react";

type ShoutViewProps = {
  viewCount: number;
};

const ShoutView: FC<ShoutViewProps> = ({ viewCount }) => {
  return (
    <div className="flex items-center justify-center flex-1">
      <Button
        className={cn(
          "rounded-full border-none size-8 p-0 hover:bg-emerald-600/20 hover:text-emerald-600"
        )}
        variant="outline"
      >
        <Activity className="size-4" />
      </Button>
      {viewCount > 0 && <span className="text-xs leading-4">{viewCount}</span>}
    </div>
  );
};

export default ShoutView;
