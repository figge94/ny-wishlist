// src/app/dashboard
import { api } from "@/lib";
import { StatCards, RecentLists, QuickActions, Reminders } from "./_components";

export default async function DashboardPage() {
  const [lists, reminders] = await Promise.all([
    api.listAll(),
    api.listReminders()
  ]);

  return (
    <div className="relative">
      <header className="mb-6">
        <p className="text-sm text-muted-foreground">
          Snabb koll på listor, påminnelser och genvägar.
        </p>
      </header>

      <div className="grid gap-6">
        <StatCards lists={lists} />

        <section className="grid gap-6 lg:grid-cols-3">
          <RecentLists lists={lists} />
          <QuickActions />
        </section>

        <Reminders reminders={reminders} />
      </div>
    </div>
  );
}
