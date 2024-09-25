import getClerkTheme from "@/utils/getClerkTheme";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  const theme = getClerkTheme();

  return (
    <UserProfile
      appearance={{
        baseTheme: theme,
      }}
    />
  );
};

export default UserProfilePage;
