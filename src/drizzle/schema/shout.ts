import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { CommentTable } from "./comment";
import { LikeTable } from "./like";

export const AllowedCommentEnum = pgEnum("allowed_comment_enum", [
  "everyone",
  "none",
]);

// 📑 Shout Table
export const ShoutTable = pgTable(
  "shouts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    message: varchar("message").notNull(),
    userId: text("user_id").notNull(),
    isModified: boolean("is_modified").notNull().default(false),
    isAnonymous: boolean("is_anonymous").notNull().default(false),
    allowedComment: AllowedCommentEnum("allowed_comment")
      .notNull()
      .default("everyone"),
    likesCount: integer("likes_count").notNull().default(0),
    viewsCount: integer("views_count").notNull().default(0),
    commentsCount: integer("comments_count").notNull().default(0),
  },
  (table) => {
    return {
      idxShoutUserId: index("idx_shout_user_id").on(table.userId),
      idxShoutCreatedAt: index("idx_shout_created_at").on(table.createdAt),
    };
  }
);

// 💞 Shout Table => Shout Relations
export const shoutRelation = relations(ShoutTable, ({ many }) => ({
  comments: many(CommentTable),
  likes: many(LikeTable),
}));

// 💉 Shout Table => Zod Schema
export const insertShoutSchema = createInsertSchema(ShoutTable, {
  message: z.string().min(1),
  userId: z.optional(z.string().uuid()),
});

export type Shout = typeof ShoutTable.$inferSelect & {
  isLiked: boolean;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    hasImage: boolean;
    imageUrl: string;
  };
};
export type InsertShout = typeof ShoutTable.$inferInsert;
