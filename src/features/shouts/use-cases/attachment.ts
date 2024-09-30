import {
  MAX_ATTACHMENT_COUNT,
  MAX_TOTAL_ATTACHMENT_SIZE,
} from "@/features/shouts/config";
import {
  createAttachment,
  deleteAttachment,
  uploadAttachment,
} from "@/features/shouts/data-access/attachment";
import {
  calculateTotalAttachmentSize,
  mapAttachmentsToUTFiles,
} from "@/features/shouts/utils";
import castArray from "lodash/castArray";

export async function uploadAttachmentUseCase(attachments: any) {
  try {
    const totalSize = calculateTotalAttachmentSize(attachments);

    if (totalSize > MAX_TOTAL_ATTACHMENT_SIZE) {
      throw new Error("Total size of attachments exceeds the limit");
    }

    const files = mapAttachmentsToUTFiles(attachments);

    if (files.length > MAX_ATTACHMENT_COUNT) {
      throw new Error("Total number of attachments exceeds the limit");
    }

    return await uploadAttachment(files);
  } catch (error) {
    throw error;
  }
}

export async function deleteAttachmentUseCase(files: any) {
  try {
    return await deleteAttachment(files);
  } catch (error) {
    throw error;
  }
}

export async function createAttachmentUseCase(
  shoutId: string,
  attachments: any
) {
  try {
    const attachment = castArray(attachments).map((attachment: any) => {
      return {
        ...attachment,
        shoutId: shoutId,
      };
    });

    return await createAttachment(attachment);
  } catch (error) {
    throw error;
  }
}
