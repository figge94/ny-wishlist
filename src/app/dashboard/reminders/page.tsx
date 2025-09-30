import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib";

export const runtime = "nodejs"; // Prisma kräver Node

function fmt(d: Date | string) {
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

export default async function RemindersPage() {
  const reminders = await api.listReminders(); // 👈 viktig ändring

  return (
    <section className="mx-auto max-w-5xl space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Påminnelser</h1>
        <Link
          href="/dashboard"
          className="text-sm text-blue-600 hover:underline hover:underline-offset-4">
          Till översikten
        </Link>
      </header>

      <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-neutral-900 sm:px-6 lg:px-8">
        {reminders.length ? (
          <ul className="divide-y divide-zinc-300">
            {reminders.map((r) => (
              <li
                key={r.id}
                className="py-3 flex items-center justify-between gap-3 sm:py-4 lg:py-5">
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-gray-500">{fmt(r.dueAt)}</div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs ring-1 ring-inset",
                      r.done
                        ? "bg-green-100 text-green-800 ring-green-200"
                        : "bg-violet-100 text-violet-800 ring-violet-200"
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
                      className="rounded-sm backdrop-blur-md shadow-lg bg-zinc-50 border border-zinc-100 px-3 py-1.5 text-xs hover:bg-gray-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600">
                      {r.done ? "Markera som planerad" : "Markera som klar"}
                    </button>
                  </form>

                  <form action={deleteReminder}>
                    <input type="hidden" name="id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-sm backdrop-blur-lg shadow-lg border border-rose-600 bg-rose-500 text-white px-3 py-1.5 text-xs hover:bg-rose-400 hover:border-rose-400 cursor-pointer">
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
