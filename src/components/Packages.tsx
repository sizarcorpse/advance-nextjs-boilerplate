import Svg from "./Svg";
import { Train, TrainContainer, TrainItem } from "./TrainAnimation";

const Packages = () => {
  return (
    <div className="max-w-screen-xl items-center bg-transparent w-full gap-2">
      <Train className="max-w-screen-lg">
        <TrainContainer duration={50}>
          {packages.map((item: any) => (
            <TrainItem key={item.id} item={item}>
              <Svg
                url={item.icon}
                className="w-12 h-12 text-primary/50 hover:text-primary transition-fill duration-300 ease-in-out"
              />
            </TrainItem>
          ))}
        </TrainContainer>
      </Train>
      <Train className="max-w-screen-lg">
        <TrainContainer direction="reverse" duration={50}>
          {packages.reverse().map((item: any) => (
            <TrainItem key={item.id} item={item}>
              <Svg
                url={item.icon}
                className="w-12 h-12 text-primary/50 hover:text-primary transition-fill duration-300 ease-in-out"
              />
            </TrainItem>
          ))}
        </TrainContainer>
      </Train>
    </div>
  );
};

export default Packages;

const packages = [
  {
    id: 1,
    icon: "/svg/packages/clerk.svg",
    title: "Clerk",
    url: "https://clerk.dev",
  },
  {
    id: 2,
    icon: "/svg/packages/crowdin.svg",
    title: "Crowdin",
    url: "https://crowdin.com",
  },
  {
    id: 3,
    icon: "/svg/packages/drizzle.svg",
    title: "Drizzle",
    url: "https://drizzle.dev",
  },
  {
    id: 4,
    icon: "/svg/packages/git.svg",
    title: "Git",
    url: "https://git-scm.com",
  },
  {
    id: 5,
    icon: "/svg/packages/github.svg",
    title: "GitHub",
    url: "https://github.com",
  },
  {
    id: 6,
    icon: "/svg/packages/jest.svg",
    title: "Jest",
    url: "https://jestjs.io",
  },
  {
    id: 7,
    icon: "/svg/packages/next.svg",
    title: "Next.js",
    url: "https://nextjs.org",
  },
  {
    id: 8,
    icon: "/svg/packages/playwright.svg",
    title: "Playwright",
    url: "https://playwright.dev",
  },
  {
    id: 9,
    icon: "/svg/packages/postgresql.svg",
    title: "PostgreSQL",
    url: "https://www.postgresql.org",
  },
  {
    id: 10,
    icon: "/svg/packages/react.svg",
    title: "React",
    url: "https://reactjs.org",
  },
  {
    id: 11,
    icon: "/svg/packages/reacthookform.svg",
    title: "React Hook Form",
    url: "https://react-hook-form.com",
  },
  {
    id: 12,
    icon: "/svg/packages/reactquery.svg",
    title: "React Query",
    url: "https://react-query.tanstack.com",
  },
  {
    id: 13,
    icon: "/svg/packages/resend.svg",
    title: "Resend",
    url: "https://resend.com",
  },
  {
    id: 14,
    icon: "/svg/packages/sentry.svg",
    title: "Sentry",
    url: "https://sentry.io",
  },
  {
    id: 15,
    icon: "/svg/packages/shadcnui.svg",
    title: "Shadcn UI",
    url: "https://ui.shadcn.com",
  },
  {
    id: 16,
    icon: "/svg/packages/storybook.svg",
    title: "Storybook",
    url: "https://storybook.js.org",
  },
  {
    id: 17,
    icon: "/svg/packages/tailwindcss.svg",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
  },
  {
    id: 18,
    icon: "/svg/packages/testinglibrary.svg",
    title: "Testing Library",
    url: "https://testing-library.com",
  },
  {
    id: 19,
    icon: "/svg/packages/typescript.svg",
    title: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  {
    id: 20,
    icon: "/svg/packages/vercel.svg",
    title: "Vercel",
    url: "https://vercel.com",
  },
  {
    id: 21,
    icon: "/svg/packages/zod.svg",
    title: "Zod",
    url: "https://zod.dev/",
  },
];
