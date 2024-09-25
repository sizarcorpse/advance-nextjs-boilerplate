import { FC } from "react";
import sanitizeHtml from "sanitize-html";

type ShoutMessageProps = {
  message: string;
};

const ShoutMessage: FC<ShoutMessageProps> = ({ message }) => {
  const cleanMessage = sanitizeHtml(message);

  return (
    <div
      className="prose dark:prose-invert leading-6 max-w-full"
      dangerouslySetInnerHTML={{ __html: cleanMessage }}
    ></div>
  );
};

export default ShoutMessage;
