import { AttachmentPayload } from "@/drizzle/schema/attachment";
import { UTFile } from "uploadthing/server";

export function mapAttachmentsToUTFiles(
  attachments: AttachmentPayload[]
): UTFile[] {
  return attachments.map((attachment: AttachmentPayload) => {
    const file = attachment.file;
    const blob = file.get("file") as Blob;

    return new UTFile([blob], attachment.name);
  });
}
