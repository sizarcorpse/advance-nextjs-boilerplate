import { InsertShout } from "@/drizzle/schema/shout";
import { getShoutLikeByUserId } from "@/features/shouts/data-access/like";
import {
  createShout,
  getShoutById,
  getShouts,
  getTotalShoutsByUserId,
  isCommentIsAllowedByShoutId,
} from "@/features/shouts/data-access/shout";

import { cache } from "react";

import {
  getUserByIdUseCase,
  getUserByIdsUseCase,
} from "@/features/users/use-case/user";

export async function createShoutUseCase(
  userId: string,
  payload: Omit<InsertShout, "userId">
) {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    const shout = await createShout({
      userId: userId,
      message: payload.message,
      isAnonymous: payload.isAnonymous,
      allowedComment: payload.allowedComment,
    });

    return shout;
  } catch (error) {
    throw error;
  }
}

export const getShoutsUseCase = cache(
  // FIXME: types
  async (userId: string) => {
    try {
      const shouts = await getShouts(userId);

      const distinctUserIds = [...new Set(shouts.map((shout) => shout.userId))];

      const users = await getUserByIdsUseCase(distinctUserIds, 20);

      const shoutsWithUsers = shouts.map((shout) => {
        const user = users.find((user) => user.id === shout.userId);

        if (!user) {
          throw new Error("User not found");
        }

        return { ...shout, user };
      });

      return shoutsWithUsers;
    } catch (error) {
      throw error;
    }
  }
);

// 🚀
export const getShoutByIdUseCase = cache(
  async (userId: string, shoutId: string) => {
    try {
      const shout = await getShoutById(shoutId);
      if (!shout) {
        throw new Error("Shout not found");
      }
      const isShoutLiked = await getShoutLikeByUserId(userId, shoutId);
      const user = await getUserByIdUseCase(shout.userId);
      return { ...shout, user, isLiked: !!isShoutLiked };
    } catch (error) {
      throw error;
    }
  }
);

export const isCommentAllowedByShoutIdUseCase = cache(
  async (shoutId: string) => {
    try {
      const isCommentAllowed = await isCommentIsAllowedByShoutId(shoutId);
      return isCommentAllowed;
    } catch (error) {
      throw error;
    }
  }
);

export const getTotalShoutsByUserIdUseCase = cache(async (userId: string) => {
  try {
    return await getTotalShoutsByUserId(userId);
  } catch (error) {
    throw error;
  }
});
