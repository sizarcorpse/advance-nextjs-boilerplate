import { type AttachmentPayload } from "@/drizzle/schema/attachment";
import castArray from "lodash/castArray";
import { UploadFileResult } from "uploadthing/types";

export function formateUploadedAttachments(
  uploadedAttachments: UploadFileResult,
  payload: { attachments?: Omit<AttachmentPayload, "preview">[] }
) {
  const attachmentsArray = castArray(uploadedAttachments);

  return attachmentsArray.map((attachment) => {
    if (!attachment?.data) {
      throw new Error("Invalid attachment data");
    }

    const attachments = payload.attachments;

    if (!attachments) {
      throw new Error("Attachments not found in payload");
    }

    const metadata = attachments.find(
      (att) => att.name === attachment.data.name
    );

    if (!metadata) {
      throw new Error(
        `Metadata not found for attachment: ${attachment.data.name}`
      );
    }

    return {
      key: attachment.data.name,
      url: attachment.data.url,
      name: attachment.data.name,
      size: attachment.data.size,
      type: attachment.data.type,
      width: metadata.metadata.width,
      height: metadata.metadata.height,
    };
  });
}
