import {
  getUserByUsernameUseCase,
  getUserStatsUseCase,
} from "@/features/users/use-case/user";

import { ProfileCard } from "src/features/users/components";

export default async function ProfilePage({
  params,
}: {
  params: {
    username: string;
  };
}) {
  const { username } = params;

  const user = await getUserByUsernameUseCase(username);
  const { shouts, comments, likes } = await getUserStatsUseCase(user.id);

  return (
    <div className="p-4 ">
      <ProfileCard
        user={user}
        stats={{
          shouts,
          comments,
          likes,
        }}
      />
    </div>
  );
}
