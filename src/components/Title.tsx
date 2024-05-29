import { cn } from "@/libs/utils";
import { forwardRef } from "react";
type TitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  [key: string]: any;
};

const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const { children, className = "", as: Component = "h1", ...rest } = props;

  return (
    <Component
      ref={ref}
      className={cn(
        `text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-50 to-neutral-800 dark:to-neutral-400 bg-opacity-50 sm:text-5xl lg:text-6xl xl:text-7xl`,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

Title.displayName = "Title";
export default Title;
