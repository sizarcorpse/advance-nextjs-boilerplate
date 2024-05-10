import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <header
      style={{ display: "flex", justifyContent: "space-between", padding: 20 }}
    >
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton userProfileUrl="/dashboard/user" />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
}

export default function Page() {
  return (
    <>
      ??
      <Header />
    </>
  );
}
