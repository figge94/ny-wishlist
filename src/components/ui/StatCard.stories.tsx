import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";
import { ListChecks } from "lucide-react";

const meta: Meta<typeof StatCard> = {
  title: "UI/StatCard",
  component: StatCard,
  args: { label: "Önskelistor", value: 3, icon: ListChecks, gradient: true }
};
export default meta;

type Story = StoryObj<typeof StatCard>;
export const Default: Story = {};
export const NoGradient: Story = { args: { gradient: false } };
