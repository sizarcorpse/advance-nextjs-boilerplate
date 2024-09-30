import { db } from "@/drizzle/db";
import {
  AttachmentTable,
  type InsertAttachment,
} from "@/drizzle/schema/attachment";
import { utapi } from "@/utils/uploadthing";
// import { cache } from "react";

export async function uploadAttachment(files: any) {
  try {
    return await utapi.uploadFiles(files);
  } catch (error) {
    throw error;
  }
}

export async function deleteAttachment(files: any) {
  try {
    return await utapi.deleteFiles(files);
  } catch (error) {
    throw error;
  }
}

export async function createAttachment(attachments: InsertAttachment[]) {
  try {
    return await db.insert(AttachmentTable).values(attachments);
  } catch (error) {
    throw error;
  }
}

// export const getAttachmentById = cache(async (id: string) => {
//   try {
//   } catch (error) {
//     throw error;
//   }
// });

// export const getAttachmentsByShoutId = cache(async (shoutId: string) => {
//   try {
//   } catch (error) {
//     throw error;
//   }
// });

// export async function deleteAttachmentById(id: string) {
//   try {
//   } catch (error) {
//     throw error;
//   }
// }

// export async function deleteAttachmentsByShoutId(shoutId: string) {
//   try {
//   } catch (error) {
//     throw error;
//   }
// }
