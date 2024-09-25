import { db } from "@/drizzle/db";
import { InsertLike, LikeTable } from "@/drizzle/schema/like";
import { ShoutTable } from "@/drizzle/schema/shout";
import { and, eq, sql } from "drizzle-orm";
import { cache } from "react";

export async function createShoutLike(payload: InsertLike) {
  try {
    await db.transaction(async (trx) => {
      await trx.insert(LikeTable).values(payload);
      await trx
        .update(ShoutTable)
        .set({
          likesCount: sql`${ShoutTable.likesCount} + 1`,
        })
        .where(eq(ShoutTable.id, payload.shoutId));
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteShoutLike(payload: InsertLike) {
  try {
    await db.transaction(async (trx) => {
      await trx
        .delete(LikeTable)
        .where(
          and(
            eq(LikeTable.shoutId, payload.shoutId),
            eq(LikeTable.userId, payload.userId)
          )
        );
      await trx
        .update(ShoutTable)
        .set({
          likesCount: sql`${ShoutTable.likesCount} - 1`,
        })
        .where(eq(ShoutTable.id, payload.shoutId));
    });
  } catch (error) {
    throw error;
  }
}

export async function getShoutLikeByUserId(userId: string, shoutId: string) {
  try {
    const like = await db
      .select()
      .from(LikeTable)
      .where(and(eq(LikeTable.shoutId, shoutId), eq(LikeTable.userId, userId)))
      .limit(1);

    return like[0];
  } catch (error) {
    throw error;
  }
}

export const getTotalLikesByUserId = cache(async (userId: string) => {
  try {
    const q = sql<number>`select count(*) from likes where user_id = ${userId}`;

    const [counts] = await db.execute(q);

    return counts?.count as number;
  } catch (error) {
    throw error;
  }
});
