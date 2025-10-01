import type { Meta, StoryObj } from "@storybook/react";
import { SectionCard } from "./SectionCard";

const meta: Meta<typeof SectionCard> = {
  title: "UI/SectionCard",
  component: SectionCard,
  args: { padded: true, children: <div>Innehåll i ett kort</div> }
};
export default meta;

type Story = StoryObj<typeof SectionCard>;

export const Default: Story = {};
export const NoPadding: Story = { args: { padded: false } };
export const CustomClass: Story = {
  args: { className: "bg-gradient-to-br from-purple-200 to-sky-200" }
};
