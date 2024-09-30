import { AttachmentPayload } from "@/drizzle/schema/attachment";

export function calculateTotalAttachmentSize(
  attachments: AttachmentPayload[]
): number {
  return attachments.reduce((acc: number, attachment: any) => {
    const file = attachment.file;
    const data = file.get("file");
    return acc + data.size;
  }, 0);
}
