"use client";

import { Button } from "@/components/ui/button";
import { AttachmentPayload } from "@/drizzle/schema/attachment";
import { convertAttachmentToPhotoProps } from "@/features/shouts/utils/";
import { X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        className="rounded-md animate-pulse"
      />
    </div>
  );
}

type GalleryProps = {
  attachment: AttachmentPayload[];
  setAttachment: any;
  isPending?: boolean;
};

export const CreateShoutFormUploadPhotoPreview: FC<GalleryProps> = ({
  attachment,
  setAttachment,
  isPending = true,
}) => {
  const photos = attachment ? convertAttachmentToPhotoProps(attachment) : [];

  const handleRemove = (photo: any) => {
    setAttachment((prev: AttachmentPayload[]) =>
      prev.filter((item) => item.name !== photo.name)
    );
  };

  return (
    <RowsPhotoAlbum
      spacing={4}
      photos={photos}
      render={{
        image: renderNextImage,
        extras: (_, { photo }) =>
          !isPending ? (
            <Button
              variant="ghost"
              onClick={() => handleRemove(photo)}
              className="absolute top-2 right-2 size-8 p-0"
              disabled={isPending}
            >
              <X className="size-4" />
            </Button>
          ) : null,
      }}
      defaultContainerWidth={1200}
      sizes={{
        size: "1168px",
        sizes: [
          { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
        ],
      }}
    />
  );
};

export default CreateShoutFormUploadPhotoPreview;
