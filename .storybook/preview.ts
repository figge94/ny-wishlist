import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      storySort: {
        order: ["UI", ["SectionCard", "StatCard", "QuickLink"], "*"]
      }
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" }
      ]
    }
  }
};

export default preview;
