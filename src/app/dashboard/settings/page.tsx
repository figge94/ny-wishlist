import { getUser } from "@/lib";
import BackToDashboard from "@/components/BackToDashboard";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getUser(); // inga argument här

  if (!user) {
    // här kan du välja att redirecta till login, eller bara visa ett meddelande
    return (
      <div className="space-y-6">
        <BackToDashboard />
        <p>Du måste vara inloggad för att se inställningar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackToDashboard />
      <SettingsClient
        user={{ name: user.name ?? "", email: user.email ?? "" }}
      />
    </div>
  );
}
