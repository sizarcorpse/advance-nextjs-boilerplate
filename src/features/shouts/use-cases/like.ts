import { InsertLike } from "@/drizzle/schema/like";
import {
  createShoutLike,
  deleteShoutLike,
  getShoutLikeByUserId,
  getTotalLikesByUserId,
} from "@/features/shouts/data-access/like";

export async function createShoutLikeUseCase(
  userId: string,
  payload: Omit<InsertLike, "userId">
) {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    await createShoutLike({
      userId: userId,
      shoutId: payload.shoutId,
    });
  } catch (error) {
    throw error;
  }
}

// This function deletes a like on a shout by a user's ID.
export async function deleteShoutLikeUseCase(
  userId: string,
  payload: Omit<InsertLike, "userId">
) {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    await deleteShoutLike({
      userId: userId,
      shoutId: payload.shoutId,
    });
  } catch (error) {
    throw error;
  }
}

// This function return a like on a shout by a user's ID.
export async function getShoutLikeByUserIdUseCase(
  userId: string,
  shoutId: string
) {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    const like = await getShoutLikeByUserId(userId, shoutId);

    return like;
  } catch (error) {
    throw error;
  }
}

// This function returns the total likes by a user's ID.
export async function getTotalLikesByUserIdUseCase(userId: string) {
  try {
    return await getTotalLikesByUserId(userId);
  } catch (error) {
    throw error;
  }
}
