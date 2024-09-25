import { db } from "@/drizzle/db";
import { type InsertComment, CommentTable } from "@/drizzle/schema/comment";
import { ShoutTable } from "@/drizzle/schema/shout";
import { and, desc, eq, sql } from "drizzle-orm";
import { cache } from "react";

export async function createComment(payload: InsertComment) {
  try {
    const [comment] = await db.transaction(async (trx) => {
      const comment = await trx
        .insert(CommentTable)
        .values(payload)
        .returning();

      await trx
        .update(ShoutTable)
        .set({
          commentsCount: sql<number>`${ShoutTable.commentsCount} + 1`,
        })
        .where(eq(ShoutTable.id, payload.shoutId));

      return comment;
    });

    return comment;
  } catch (error) {
    throw error;
  }
}

export async function getCommentsByShoutId(shoutId: string, page: number = 1) {
  const COMMENTS_PER_PAGE = 5;

  try {
    const comments = await db
      .select()
      .from(CommentTable)
      .where(eq(CommentTable.shoutId, shoutId))
      .limit(COMMENTS_PER_PAGE)
      .offset((page - 1) * COMMENTS_PER_PAGE)
      .orderBy(desc(CommentTable.createdAt));

    return { comments, limit: COMMENTS_PER_PAGE };
  } catch (error) {
    throw error;
  }
}

export const getCommentsCountByShoutId = async (shoutId: string) => {
  try {
    return await db
      .select({ count: sql<number>`cast(count(${CommentTable.id}) as int)` })
      .from(CommentTable)
      .where(eq(CommentTable.shoutId, shoutId));
  } catch (error) {
    throw error;
  }
};

export async function deleteComment(
  userId: string,
  shoutId: string,
  commentId: string
) {
  try {
    await db.transaction(async (trx) => {
      const [comment] = await trx
        .delete(CommentTable)
        .where(
          and(eq(CommentTable.id, commentId), eq(CommentTable.userId, userId))
        )
        .returning({ id: CommentTable.id });

      await trx
        .update(ShoutTable)
        .set({
          commentsCount: sql<number>`${ShoutTable.commentsCount} - 1`,
        })
        .where(eq(ShoutTable.id, shoutId));

      if (!comment) {
        trx.rollback();
        return;
      }
    });
  } catch (error) {
    throw error;
  }
}

export const getTotalCommentsByUserId = cache(async (userId: string) => {
  try {
    const q = sql<number>`SELECT count(*) FROM comments WHERE user_id = ${userId}`;

    const [counts] = await db.execute(q);

    return counts?.count as number;
  } catch (error) {
    throw error;
  }
});
