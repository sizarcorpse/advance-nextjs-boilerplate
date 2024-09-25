import { CreateShoutForm, ShoutCollection } from "@/features/shouts/components";
import { getShoutsUseCase } from "@/features/shouts/use-cases/shout";
import { auth } from "@clerk/nextjs/server";

export default async function ShoutPage() {
  const { userId } = auth().protect();

  const shouts = await getShoutsUseCase(userId);

  return (
    <div className="space-y-10">
      <CreateShoutForm />
      <ShoutCollection shouts={shouts} />
    </div>
  );
}
