import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { ShoutTable } from "./shout";

// 📑 Comment Table
export const CommentTable = pgTable(
  "comments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    shoutId: uuid("shout_id")
      .references(() => ShoutTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: text("user_id").notNull(),
    message: varchar("message").notNull(),
  },
  (table) => {
    return {
      idxCommentShoutId: index("idx_comment_shout_id").on(table.shoutId),
      idxCommentCreatedAt: index("idx_comment_created_At").on(table.createdAt),
    };
  }
);

// 💞 Comment Table => Comment Relations
export const commentRelation = relations(CommentTable, ({ one }) => ({
  shout: one(ShoutTable, {
    fields: [CommentTable.shoutId],
    references: [ShoutTable.id],
  }),
}));

// 💉 Comment Table => Zod Schema
// Define a base schema
const messageSchema = z.object({
  message: z.string().min(1),
});

export const insertCommentSchema = createInsertSchema(
  CommentTable,
  messageSchema.shape
);

// Zod Schema for client-side validation.
export const insertCommentSchemaRHF = messageSchema;

// TypeScript types inferred from Zod schemas and CommentTable
export type Comment = typeof CommentTable.$inferSelect & {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    hasImage: boolean;
    imageUrl: string;
  };
};
export type InsertComment = typeof CommentTable.$inferInsert;
export type InsertCommentRHF = z.infer<typeof insertCommentSchemaRHF>;
