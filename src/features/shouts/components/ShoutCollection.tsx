import { type Shout } from "@/drizzle/schema/shout";
import { ShoutCard } from "@/features/shouts/components/";
import { FC } from "react";

type ShoutCollectionProps = {
  shouts: Shout[];
};

const ShoutCollection: FC<ShoutCollectionProps> = ({ shouts }) => {
  return (
    <div className="group/shouts flex flex-col">
      {shouts.map((shout, index) => (
        <ShoutCard key={index} shout={shout} />
      ))}
    </div>
  );
};

export default ShoutCollection;
