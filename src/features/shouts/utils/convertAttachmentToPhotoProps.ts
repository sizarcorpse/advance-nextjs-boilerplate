import { AttachmentPayload } from "@/drizzle/schema/attachment";
import { Photo } from "react-photo-album";

export const convertAttachmentToPhotoProps = (
  attachment: AttachmentPayload[]
): Photo[] => {
  return attachment.map((photo) => ({
    name: photo.name,
    src: photo.preview,
    width: photo.metadata.width,
    height: photo.metadata.height,
  }));
};
