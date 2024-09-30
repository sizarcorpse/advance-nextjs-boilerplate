import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  smallint,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { ShoutTable } from "./shout";

export const AttachmentTable = pgTable(
  "attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: varchar("key").notNull(),
    url: varchar("url").notNull(),
    name: varchar("name").notNull(),
    size: integer("size").notNull(),
    type: varchar("type").notNull(),
    width: smallint("width").notNull(),
    height: smallint("height").notNull(),
    shoutId: uuid("shout_id")
      .notNull()
      .references(() => ShoutTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      idxAttachmentShoutId: index("idx_attachment_shout_id").on(table.shoutId),
    };
  }
);

export const attachmentRelation = relations(AttachmentTable, ({ one }) => ({
  shout: one(ShoutTable, {
    fields: [AttachmentTable.shoutId],
    references: [ShoutTable.id],
  }),
}));

export const insertAttachmentSchema = createInsertSchema(AttachmentTable);
export type InsertAttachment = typeof AttachmentTable.$inferInsert;
export type Attachment = typeof AttachmentTable.$inferSelect;

export type AttachmentPayload = {
  name: string;
  file: FormData;
  preview: string;
  metadata: {
    width: number;
    height: number;
  };
};
