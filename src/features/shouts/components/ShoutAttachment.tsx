import { Attachment } from "@/drizzle/schema/attachment";
import { ShoutImage } from "@/features/shouts/components/";
import { FC } from "react";
import { UnstableServerPhotoAlbum as ServerPhotoAlbum } from "react-photo-album/server";

type ShoutAttachmentProps = {
  attachments: Attachment[];
};

const ShoutAttachment: FC<ShoutAttachmentProps> = ({ attachments }) => {
  const photos = attachments
    ? attachments.map((attachment) => {
        return {
          src: attachment.url,
          width: attachment.width,
          height: attachment.height,
        };
      })
    : [];

  return (
    <ServerPhotoAlbum
      layout="rows"
      photos={photos}
      render={{
        image: (props, context) => (
          <ShoutImage props={props} context={context} />
        ),
      }}
      targetRowHeight={200}
      breakpoints={[640, 768, 1024]}
      spacing={4}
      sizes={{
        size: "1024px",
        sizes: [
          { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
        ],
      }}
    />
  );
};

export default ShoutAttachment;
