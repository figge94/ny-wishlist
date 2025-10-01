import type { Meta, StoryObj } from "@storybook/react";
import { QuickLink } from "./QuickLink";
import { PlusCircle } from "lucide-react";

const meta: Meta<typeof QuickLink> = {
  title: "UI/QuickLink",
  component: QuickLink,
  args: {
    href: "/wishlist/new",
    icon: <PlusCircle className="h-4 w-4" />,
    children: "Skapa ny lista"
  }
};
export default meta;

type Story = StoryObj<typeof QuickLink>;
export const Default: Story = {};
