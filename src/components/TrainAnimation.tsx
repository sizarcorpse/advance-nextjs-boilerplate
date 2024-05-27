"use client";

import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { FC } from "react";

export type TainProps = {
  children: React.ReactNode;
  className?: string;
};

export type TrainContainerProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "default" | "reverse";
  duration?: number;
};

export type TrainItemProps = {
  children: React.ReactNode;
  className?: string;
  item?: {
    id: number;
    icon: string;
    title: string;
    url: string;
  };
};

export const Train: FC<TainProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        `relative flex flex-row max-w-lg overflow-x-hidden`,
        className
      )}
    >
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-full sm:w-32 md:w-44 bg-gradient-to-r from-background to-transparent" />
      {children}
      {children}
      <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-full sm:w-32 md:w-44 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export const TrainContainer: FC<TrainContainerProps> = ({
  children,
  className,
  direction = "default",
  duration = 15,
}) => {
  const cv = {
    initial: {
      x: direction === "default" ? "0%" : "-100%",
    },
    animate: {
      x: direction === "default" ? "-100%" : "0%",
      transition: {
        x: {
          duration: duration.toString(),
          repeat: Infinity,
          yoYo: Infinity,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.div
      className={cn(
        `z-10 flex min-w-full flex-[0_0_auto] items-center flex-row`,
        className
      )}
      variants={cv}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const TrainItem: FC<TrainItemProps> = ({
  children,
  className,
  item,
}) => {
  const handleOpenUrlInNewTab = (url?: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <motion.div
      className={cn(
        `group relative shrink-0 size-32 border-border border-[0.5px] rounded-md flex items-center justify-center shadow-[inset_0_0_32px_-5px_rgba(254,254,254,0.07)] cursor-pointer hover:shadow-[inset_0_0_50px_-5px_rgba(254,254,254,0.1)] transition-shadow duration-500 py-1 my-1 mx-2`,
        className
      )}
      initial="initial"
      animate="animate"
      onClick={() => handleOpenUrlInNewTab(item?.url)}
    >
      {children}
    </motion.div>
  );
};
