import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options"; // din NextAuth-konfig
import { redirect } from "next/navigation";
import { NewReminderForm } from "@/components/NewReminderForm";
import { ReminderList } from "@/components/ReminderList";

export default async function RemindersPage() {
  // (valfritt men rekommenderat) skydda sidan så icke-inloggade redirectas till login
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/reminders");

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-medium">Påminnelser</h1>
      <NewReminderForm
        onCreate={function (input: {
          title: string;
          dueAt?: string;
          list?: string | null;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ReminderList />
    </main>
  );
}
