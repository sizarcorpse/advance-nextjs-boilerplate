import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const ShoutTable = pgTable(
  "shout",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    message: varchar("message", {
      length: 500,
    }).notNull(),
    userId: text("userId").notNull(),
    isModified: boolean("isModified").notNull().default(false),
    isAnonymous: boolean("isAnonymous").notNull().default(false),
    allowedComment: boolean("allowedComment").notNull().default(true),
    likesCount: integer("likesCount").notNull().default(0),
    viewsCount: integer("viewsCount").notNull().default(0),
    commentsCount: integer("commentsCount").notNull().default(0),
  },
  (table) => {
    return {
      shoutUserIndex: index("shout_userId_index").on(table.userId),
      shoutCreatedAtIndex: index("shout_createdAt_index").on(table.createdAt),
    };
  }
);

export const LikeTable = pgTable(
  "like",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    shoutId: uuid("shoutId")
      .references(() => ShoutTable.id)
      .notNull(),
    userId: text("userId").notNull(),
  },
  (table) => {
    return {
      likeCreatedAtIndex: index("like_createdAt_index").on(table.createdAt),
      likeShoutIdUserId: unique("like_shoutId_userId_unique").on(
        table.shoutId,
        table.userId
      ),
    };
  }
);

export const CommentTable = pgTable(
  "comment",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    shoutId: uuid("shoutId")
      .references(() => ShoutTable.id)
      .notNull(),
    userId: text("userId").notNull(),
    message: varchar("message", {
      length: 500,
    }).notNull(),
  },
  (table) => {
    return {
      commentCreatedAtIndex: index("comment_createdAt_index").on(
        table.createdAt
      ),
    };
  }
);
