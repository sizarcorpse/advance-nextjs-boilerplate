import { Separator } from "@/components/ui/separator";
import { UserDTO } from "@/features/users/data-transform/user";
import { Heart, MessageCircle, Speech } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type ProfileCardProps = {
  user: UserDTO;
  stats: {
    shouts: number;
    comments: number;
    likes: number;
  };
};

const ProfileCardName: FC<{
  firstName?: string;
  lastName?: string;
}> = ({ firstName, lastName }) => {
  if (!firstName && !lastName)
    return <p className="text-xl font-semibold">Anonymous</p>;

  const fullName = `${firstName} ${lastName}`;

  return <p className="text-xl font-semibold">{fullName}</p>;
};

const ProfileCardUsername: FC<{
  username?: string;
}> = ({ username }) => {
  if (!username) return null;

  return (
    <Link
      href={`/user/${username}`}
      className="text-base font-light text-foreground/60 hover:underline"
    >
      <span>@{username}</span>
    </Link>
  );
};

const ProfileCardPhoto: FC<{ hasImage: boolean; imageUrl: string }> = ({
  hasImage,
  imageUrl,
}) => {
  if (!hasImage) return null;

  return (
    <Image
      src={imageUrl as string}
      alt="User Avatar"
      width={600}
      height={600}
      className="rounded-lg aspect-square object-cover size-16 md:size-full"
    />
  );
};

const ProfileCardStatsTotalShouts: FC<{
  count: number;
}> = ({ count }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Speech className="size-4" />
        <span className="text-sm leading-4">{count}</span>
      </div>

      <span className="text-xs leading-4 text-foreground/60">Shouts</span>
    </div>
  );
};

const ProfileCardStatsTotalComments: FC<{
  count: number;
}> = ({ count }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <MessageCircle className="size-4" />
        <span className="text-sm leading-4">{count}</span>
      </div>

      <span className="text-xs leading-4 text-foreground/60">Shouts</span>
    </div>
  );
};

const ProfileCardStatsTotalLikes: FC<{
  count: number;
}> = ({ count }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Heart className="size-4" />
        <span className="text-sm leading-4">{count}</span>
      </div>

      <span className="text-xs leading-4 text-foreground/60">Shouts</span>
    </div>
  );
};

const ProfileCard: FC<ProfileCardProps> = ({ user, stats }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-start gap-4 md:flex-col md:items-start">
        <ProfileCardPhoto
          hasImage={user.hasImage}
          imageUrl={user.imageUrl as string}
        />
        <div>
          <ProfileCardName
            firstName={user.firstName}
            lastName={user.lastName}
          />
          <ProfileCardUsername username={user.username} />
        </div>
      </div>

      <Separator />
      <div className="flex items-start justify-start gap-12">
        <ProfileCardStatsTotalShouts count={stats.shouts} />
        <ProfileCardStatsTotalComments count={stats.comments} />
        <ProfileCardStatsTotalLikes count={stats.likes} />
      </div>
      <Separator />
    </div>
  );
};

export default ProfileCard;
