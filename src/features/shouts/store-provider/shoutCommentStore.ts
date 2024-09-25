import { Comment } from "@/drizzle/schema/comment";
import { createStore } from "zustand/vanilla";

export type ShoutCommentState = {
  comments: Comment[];
  counts: number;
  limit: number;
};

export type ShoutCommentActions = {
  addComment: (comment: Comment) => void;
  addComments: (comments: Comment[]) => void;
  removeComment: (commentId: string) => void;
  commentsCount: (totalComments: number) => void;
};

export type ShoutCommentStore = ShoutCommentState & ShoutCommentActions;

export const defaultInitState: ShoutCommentState = {
  comments: [],
  counts: 0,
  limit: 0,
};

export const createShoutCommentStore = (
  initState: ShoutCommentState = defaultInitState
) => {
  return createStore<ShoutCommentStore>()((set) => ({
    ...initState,

    addComment: (comment) =>
      set((state) => ({
        comments: [comment, ...state.comments],
      })),
    addComments: (comments) =>
      set((state) => ({ comments: [...state.comments, ...comments] })),
    removeComment: (commentId) =>
      set((state) => ({
        comments: state.comments.filter((comment) => comment.id !== commentId),
      })),
    commentsCount: (totalCount) => set(() => ({ counts: totalCount })),
  }));
};
