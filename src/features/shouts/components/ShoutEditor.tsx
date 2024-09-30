"use client";

import { InsertShout } from "@/drizzle/schema/shout";
import { cn } from "@/libs/utils";
import "@/styles/blocknote.css";
import { locales } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import sanitizeHtml from "sanitize-html";

const lightTheme = {
  ...lightDefaultTheme,
  colors: {
    editor: {
      text: "hsl(240 10% 3.9%)",
      background: "transparent",
    },
  },
} satisfies Theme;

const darkTheme = {
  ...darkDefaultTheme,
  colors: {
    editor: {
      text: "hsl(0 0% 98%)",
      background: "transparent",
    },
  },
} satisfies Theme;

const customTheme = {
  light: lightTheme,
  dark: darkTheme,
};

const getBlockNoteLocale = (locale: "en" | "fr" | "es") => {
  let l;
  switch (locale) {
    case "en":
      l = locales.en;
      break;
    case "fr":
      l = locales.fr;
      break;
    default:
      l = locales.en;
      break;
  }
  return l;
};

const Editor = ({
  form,
  className,
  resetEditor,
}: {
  form: UseFormReturn<Omit<InsertShout, "userId">>;
  resetEditor: boolean;
  className?: string;
}) => {
  const { theme } = useTheme();
  const locale = useLocale();

  const editor = useCreateBlockNote({
    dictionary: getBlockNoteLocale(locale as "en" | "fr" | "es"),
    initialContent: [{}],
  });

  useEffect(() => {
    if (resetEditor) {
      editor.removeBlocks(editor.document);
    }
  }, [resetEditor, editor]);

  const onContentChange = async () => {
    try {
      const content = editor.document;
      const html = await editor.blocksToHTMLLossy(content);
      const cleanHtml = sanitizeHtml(html, {});

      form.setValue("message", cleanHtml);
      form.trigger("message");
    } catch (error) {
      form.setError("message", {
        type: "validate",
        message: "An error occurred while saving the shout.",
      });
    }
  };

  return (
    <BlockNoteView
      editor={editor}
      sideMenu={false}
      slashMenu={false}
      tableHandles={false}
      formattingToolbar={false}
      theme={theme === "dark" ? customTheme.dark : customTheme.light}
      onChange={onContentChange}
      className={cn(`p-0`, className)}
    />
  );
};

export default Editor;
