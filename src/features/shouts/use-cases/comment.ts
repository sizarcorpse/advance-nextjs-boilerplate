import { Comment, InsertComment } from "@/drizzle/schema/comment";
import {
  createComment,
  deleteComment,
  getCommentsByShoutId,
  getCommentsCountByShoutId,
  getTotalCommentsByUserId,
} from "@/features/shouts/data-access/comment";
import { isCommentIsAllowedByShoutId } from "@/features/shouts/data-access/shout";
import { getUserByIdsUseCase } from "@/features/users/use-case/user";

export async function getCommentsWithUserUseCase(
  comments: Omit<Comment, "user">[]
) {
  try {
    const distinctUserIds = [
      ...new Set(comments.map((comment) => comment.userId)),
    ];

    const users = await getUserByIdsUseCase(distinctUserIds, 20);

    const commentsWithUsers = comments.map((comment) => {
      const user = users.find((user) => user.id === comment.userId);

      if (!user) {
        throw new Error("User not found");
      }

      return { ...comment, user };
    });

    return commentsWithUsers;
  } catch (error) {
    throw error;
  }
}

export async function createCommentUseCase(
  userId: string,
  payload: InsertComment
) {
  try {
    const isAllowed = await isCommentIsAllowedByShoutId(payload.shoutId);

    if (!isAllowed) {
      throw new Error("Comment is not allowed");
    }

    return await createComment({
      userId: userId,
      shoutId: payload.shoutId,
      message: payload.message,
    });
  } catch (error) {
    throw error;
  }
}

export async function getCommentsByShoutIdUseCase(
  shoutId: string,
  page: number = 1
) {
  try {
    const { comments, limit } = await getCommentsByShoutId(shoutId, page);
    const [counts] = await getCommentsCountByShoutId(shoutId);

    const commentsWithUsers = await getCommentsWithUserUseCase(comments);

    return {
      comments: commentsWithUsers,
      counts: counts?.count ? counts.count : 0,
      limit,
    };
  } catch (error) {
    throw error;
  }
}

export async function deleteCommentUseCase(
  userId: string,
  shoutId: string,
  commentId: string
) {
  try {
    await deleteComment(userId, shoutId, commentId);
  } catch (error) {
    throw error;
  }
}

export async function getTotalCommentsByUserIdUseCase(userId: string) {
  try {
    return await getTotalCommentsByUserId(userId);
  } catch (error) {
    throw error;
  }
}
