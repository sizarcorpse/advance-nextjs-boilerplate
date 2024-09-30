import { MobileNavigation, SiteLogo } from "@/components";
import { UserDropdownMenu } from "@/features/shouts/components";
import { SignedIn } from "@clerk/nextjs";
const AuthHeader = () => {
  return (
    <header className="w-full h-14 p-4 flex flex-row items-center justify-start gap-4">
      <div className="inline-flex gap-1">
        <MobileNavigation />
        <SiteLogo userLoggedIn={true} />
      </div>
      <SignedIn>
        <div className="grow">{/* <Navigation /> */}</div>
        <div>
          <UserDropdownMenu />
        </div>
      </SignedIn>
    </header>
  );
};

export default AuthHeader;
