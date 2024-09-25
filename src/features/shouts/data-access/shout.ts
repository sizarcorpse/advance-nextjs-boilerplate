import { db } from "@/drizzle/db";
import { LikeTable } from "@/drizzle/schema/like";
import { type InsertShout, ShoutTable } from "@/drizzle/schema/shout";
import { and, desc, eq, sql } from "drizzle-orm";
import { cache } from "react";

export async function createShout(payload: InsertShout) {
  try {
    const shout = await db.insert(ShoutTable).values(payload).returning();

    if (!shout) {
      throw new Error("Failed to create shout");
    }

    return shout[0];
  } catch (error) {
    throw error;
  }
}

export const getShouts = cache(async (userId: string) => {
  try {
    const shouts = await db.query.ShoutTable.findMany({
      with: {
        likes: {
          where: eq(LikeTable.userId, userId),
        },
      },
      orderBy: desc(ShoutTable.createdAt),
    });

    const ShoutLikes = shouts.map((shout) => {
      return {
        ...shout,
        isLiked: shout.likes.length > 0,
      };
    });

    return ShoutLikes;
  } catch (error) {
    throw error;
  }
});

export async function getShoutById(shoutId: string) {
  try {
    const shout = await db
      .select()
      .from(ShoutTable)
      .where(eq(ShoutTable.id, shoutId))
      .limit(1);

    return shout[0];
  } catch (error) {
    throw error;
  }
}

export const isCommentIsAllowedByShoutId = cache(async (shoutId: string) => {
  try {
    const shout = await db
      .select()
      .from(ShoutTable)
      .where(
        and(
          eq(ShoutTable.id, shoutId),
          eq(ShoutTable.allowedComment, "everyone")
        )
      );

    return shout.length > 0;
  } catch (error) {
    throw error;
  }
});

export const getTotalShoutsByUserId = cache(async (userId: string) => {
  try {
    const q = sql<number>`SELECT count(*) FROM shouts WHERE user_id = ${userId}`;

    const [counts] = await db.execute(q);

    return counts?.count as number;
  } catch (error) {
    throw error;
  }
});
