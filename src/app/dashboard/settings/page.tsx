import { getUser } from "@/lib/data";
import BackToDashboard from "@/components/back-to-dashboard";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
  const user = await getUser("1");
  return (
    <div className="space-y-6">
      <BackToDashboard />
      <SettingsClient user={{ name: user.name, email: user.email }} />
    </div>
  );
}
