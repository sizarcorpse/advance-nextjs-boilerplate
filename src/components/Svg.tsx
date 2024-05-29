"use client";

import DOMPurify from "dompurify";
import { forwardRef, useEffect, useState } from "react";

type SvgProps = React.HTMLProps<HTMLDivElement> & {
  url: string;
};

const fetchSvg = async (url: string): Promise<string> => {
  const svgData = await (await fetch(url)).text();
  const sanitizedSvgData = DOMPurify.sanitize(svgData, {
    FORBID_ATTR: ["style"],
  });
  return sanitizedSvgData;
};

const Svg = forwardRef<HTMLDivElement, SvgProps>(({ url, ...props }, ref) => {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    fetchSvg(url).then((data) => setSvg(data));
  }, [url]);
  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} {...props}></div>
  );
});

Svg.displayName = "Svg";

export default Svg;
