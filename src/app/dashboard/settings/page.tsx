import { getUser } from "@/lib";
import BackToDashboard from "@/components/BackToDashboard";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getUser("1");
  return (
    <div className="space-y-6">
      <BackToDashboard />
      <SettingsClient user={{ name: user.name, email: user.email }} />
    </div>
  );
}
