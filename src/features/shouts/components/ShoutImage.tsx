import Image from "next/image";
import { FC } from "react";
import { RenderImageContext, RenderImageProps } from "react-photo-album";

export type ShoutImageProps = {
  props: RenderImageProps;
  context: RenderImageContext;
};

const ShoutImage: FC<ShoutImageProps> = ({ props, context }) => {
  const { alt = "", title, sizes } = props;
  const { photo, width, height } = context;

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
        className="rounded-sm"
      />
    </div>
  );
};

export default ShoutImage;
