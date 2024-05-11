"use client";

import { cn } from "@/libs/utils";
import { forwardRef } from "react";

type HeadingProps = {
  children: string;
  className: string;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = "", children, size = "md", ...rest }, ref) => {
    const combinedClassName = cn(
      `cursor-pointer hover:text-red-300`,
      size === "sm" && "text-5xl font-medium",
      size === "md" && "text-6xl font-semibold",
      size === "lg" && "text-7xl font-bold",
      className
    );

    return (
      <h1 ref={ref} className={combinedClassName} {...rest}>
        {children}
      </h1>
    );
  }
);

Heading.displayName = "Heading";
export default Heading;
