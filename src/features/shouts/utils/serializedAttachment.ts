import { AttachmentPayload } from "@/drizzle/schema/attachment";

export function serializedAttachment(attachment: AttachmentPayload[]) {
  return attachment.map((att) => ({
    name: att.name,
    file: att.file,
    metadata: {
      width: att.metadata.width,
      height: att.metadata.height,
    },
  }));
}
