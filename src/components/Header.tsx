import GetStartedButton from "@/components/GetStartedButton";
import SiteLogo from "@/components/SiteLogo";
import StartShoutButton from "@/components/StartShoutButton";
import { Separator } from "@/components/ui/separator";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

export const Header = ({ userLoggedIn = false }: { userLoggedIn: boolean }) => {
  return (
    <header className="w-full h-14 p-4 flex flex-row items-center justify-start gap-4">
      <div className="inline-flex gap-1">
        <MobileNavigation />
        <Separator orientation="vertical" className="bg-primary w-1" />
        <SiteLogo />
      </div>
      <div className="grow">
        <Navigation />
      </div>
      <div>{userLoggedIn ? <StartShoutButton /> : <GetStartedButton />}</div>
    </header>
  );
};

export default Header;
