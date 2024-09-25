import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { ShoutTable } from "./shout";

// 📑 Like Table

export const LikeTable = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    shoutId: uuid("shout_id")
      .references(() => ShoutTable.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id").notNull(),
  },
  (table) => {
    return {
      idxLikeShoutId: index("idx_like_shout_id").on(table.shoutId),
      idxLikeCreatedAt: index("idx_like_created_at").on(table.createdAt),
      uqLikeShoutIdUserId: unique("uq_like_shoutId_userId").on(
        table.shoutId,
        table.userId
      ),
    };
  }
);

// 💞 Like Table => Like Relations

export const likeRelation = relations(LikeTable, ({ one }) => ({
  shout: one(ShoutTable, {
    fields: [LikeTable.shoutId],
    references: [ShoutTable.id],
  }),
}));

// 💉 Like Table => Zod Schema
export const insertLikeSchema = createInsertSchema(LikeTable, {
  userId: z.optional(z.string().uuid()),
});

export type InsertLike = typeof LikeTable.$inferInsert;
export type Like = typeof LikeTable.$inferSelect;
