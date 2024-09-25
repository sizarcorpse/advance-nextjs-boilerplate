import { ShoutContent } from "@/features/shouts/components";
import { getShoutByIdUseCase } from "@/features/shouts/use-cases/shout";
import { auth } from "@clerk/nextjs/server";
import { type NextPage } from "next";

type ShoutPageProps = {
  params: {
    shoutId: string;
  };
};

type MetadataProps = {
  params: {
    shoutId: string;
  };
};

export async function generateMetadata({ params }: MetadataProps) {
  try {
    const { userId } = auth();
    if (!userId) return null;

    const shout = await getShoutByIdUseCase(userId, params.shoutId);
    if (!shout) return null;

    return {
      title: shout.user.username,
      description: shout.message,
    };
  } catch (error) {
    throw null;
  }
}

const ShoutPage: NextPage<ShoutPageProps> = async ({ params }) => {
  const { shoutId } = params;
  const { userId } = auth().protect();

  const shout = await getShoutByIdUseCase(userId, shoutId);

  return (
    <div>
      <ShoutContent shout={shout} />
    </div>
  );
};

export default ShoutPage;
