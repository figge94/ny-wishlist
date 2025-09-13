import { getUser } from "@/lib/data";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
  const user = await getUser("1"); // fejk tills vidare
  return <SettingsClient user={{ name: user.name, email: user.email }} />;
}
