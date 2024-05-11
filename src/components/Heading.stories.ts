import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: {
    size: "md",
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
      defaultValue: "md",
    },
  },
};

export default meta;

type HeadingStory = StoryObj<typeof Heading>;

export const Default: HeadingStory = {
  name: "So simple!",
  args: {
    children: "Hello World! x",
    onClick: action("on-click"),
  },
};
