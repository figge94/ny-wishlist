// app/dashboard/reminders/page.tsx
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib";

function fmt(d: string) {
  return new Date(d).toLocaleString("sv-SE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// TOGGLE
async function toggleReminder(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const next = String(formData.get("next")) === "true";
  await api.toggleReminder(id, next);
  revalidatePath("/dashboard/reminders");
  redirect("/dashboard/reminders");
}

// DELETE
async function deleteReminder(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await api.deleteReminder(id);
  revalidatePath("/dashboard/reminders");
  redirect("/dashboard/reminders");
}

export default function RemindersPage() {
  const reminders = api
    .listReminders()
    .slice()
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-8 ">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Påminnelser</h1>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline">
          Till översikten
        </Link>
      </header>

      {/* Lista */}
      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-neutral-900">
        {reminders.length ? (
          <ul className="divide-y">
            {reminders.map((r) => (
              <li
                key={r.id}
                className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-gray-500">{fmt(r.dueAt)}</div>
                </div>

                <div className="flex items-center gap-2">
                  {/* status-chip */}
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs ring-1 ring-inset",
                      r.done
                        ? "bg-green-50 text-green-700 ring-green-200"
                        : "bg-amber-50 text-amber-700 ring-amber-200"
                    ].join(" ")}>
                    {r.done ? "Klar" : "Planerad"}
                  </span>

                  <form action={toggleReminder}>
                    <input type="hidden" name="id" value={r.id} />
                    <input
                      type="hidden"
                      name="next"
                      value={(!r.done).toString()}
                    />
                    <button
                      type="submit"
                      className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50">
                      {r.done ? "Markera som planerad" : "Markera som klar"}
                    </button>
                  </form>

                  <form action={deleteReminder}>
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-red-200 text-red-700 px-2 py-1 text-xs hover:bg-red-50"
                      formAction={deleteReminder}>
                      Ta bort
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Inga påminnelser ännu.</p>
        )}
      </div>
    </section>
  );
}
