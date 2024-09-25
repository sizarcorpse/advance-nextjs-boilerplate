import { getTotalCommentsByUserIdUseCase } from "@/features/shouts/use-cases/comment";
import { getTotalLikesByUserIdUseCase } from "@/features/shouts/use-cases/like";
import { getTotalShoutsByUserIdUseCase } from "@/features/shouts/use-cases/shout";
import {
  getUserById,
  getUserByIds,
  getUserByUsername,
} from "@/features/users/data-access/user";
import { toUserDTO } from "@/features/users/data-transform/user";

export async function getUserByIdUseCase(userId: string) {
  try {
    const user = await getUserById(userId);
    return toUserDTO(user);
  } catch (error) {
    throw error;
  }
}

export async function getUserByIdsUseCase(userIds: string[], limit: number) {
  try {
    const users = await getUserByIds(userIds, limit);
    return users.map(toUserDTO);
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsernameUseCase(username: string) {
  try {
    const user = await getUserByUsername(username);

    return toUserDTO(user);
  } catch (error) {
    throw error;
  }
}

export async function getUserStatsUseCase(userId: string) {
  try {
    const [shouts, comments, likes] = await Promise.all([
      getTotalShoutsByUserIdUseCase(userId),
      getTotalCommentsByUserIdUseCase(userId),
      getTotalLikesByUserIdUseCase(userId),
    ]);

    return {
      shouts,
      comments,
      likes,
    };
  } catch (error) {
    throw error;
  }
}
