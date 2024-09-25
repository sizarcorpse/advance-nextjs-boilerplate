export default function ShoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container h-[calc(100vh-120px)] py-6 grid grid-cols-12 gap-y-10 md:gap-x-4 xl:gap-x-10">
      <div className="hidden col-span-12 lg:block lg:col-span-3"></div>
      <div className="col-span-12 space-y-8 lg:col-span-6">{children}</div>
      <div className="hidden col-span-12 lg:block lg:col-span-3"></div>
    </div>
  );
}
