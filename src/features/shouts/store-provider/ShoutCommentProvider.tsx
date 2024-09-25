"use client";
import { Comment } from "@/drizzle/schema/comment";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import {
  type ShoutCommentStore,
  createShoutCommentStore,
} from "@/features/shouts/store-provider/shoutCommentStore";

export type ShoutCommentStoreApi = ReturnType<typeof createShoutCommentStore>;

export const ShoutCommentContext = createContext<
  ShoutCommentStoreApi | undefined
>(undefined);

export interface ShoutCommentStoreProviderProps {
  children: ReactNode;
  value: {
    comments: Comment[];
    counts: number;
    limit: number;
  };
}

export const ShoutCommentStoreProvider = ({
  children,
  value,
}: ShoutCommentStoreProviderProps) => {
  const storeRef = useRef<ShoutCommentStoreApi>();

  storeRef.current = createShoutCommentStore(value);

  return (
    <ShoutCommentContext.Provider value={storeRef.current}>
      {children}
    </ShoutCommentContext.Provider>
  );
};

export const useShoutCommentStore = <T,>(
  selector: (store: ShoutCommentStore) => T
): T => {
  const shoutCommentStoreContext = useContext(ShoutCommentContext);

  if (!shoutCommentStoreContext) {
    throw new Error(
      `useShoutCommentStore must be used within CounterStoreProvider`
    );
  }

  return useStore(shoutCommentStoreContext, selector);
};
