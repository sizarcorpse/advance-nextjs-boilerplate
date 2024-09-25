export default function UserLayout({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <div className="container h-[calc(100vh-120px)] py-6 grid grid-cols-12 auto-rows-max">
      <div className="col-span-12 border max-md:rounded-t-lg md:col-span-5 md:rounded-l-lg lg:col-span-4 sticky top-0">
        {profile}
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-y-10 items-center border max-md:border-t-0 max-md:rounded-b-lg md:col-span-7 md:border-l-0 md:rounded-r-lg lg:col-span-8">
        {children}
      </div>
    </div>
  );
}
