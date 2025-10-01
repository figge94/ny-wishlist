"use client";
import { useCallback, useMemo, useState } from "react";

type UserDto = { name?: string | null; email?: string | null };

type TabKey = "profile" | "security" | "notifications";
const TABS: { k: TabKey; label: string }[] = [
  { k: "profile", label: "Profil" },
  { k: "security", label: "Säkerhet" },
  { k: "notifications", label: "Notiser" }
];

type Props = { user: UserDto };

export default function SettingsClient({ user }: Props) {
  const [tab, setTab] = useState<TabKey>("profile");

  const currentIndex = useMemo(() => TABS.findIndex((t) => t.k === tab), [tab]);

  const onTabsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (currentIndex + dir + TABS.length) % TABS.length;
      setTab(TABS[next].k);
    },
    [currentIndex]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium text-gray-800">Inställningar</h1>

      {/* Tabs */}
      <div
        className="flex gap-2"
        role="tablist"
        aria-label="Inställningar"
        onKeyDown={onTabsKeyDown}>
        {TABS.map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.k}`}
              id={`tab-${t.k}`}
              onClick={() => setTab(t.k)}
              className={[
                "rounded-full px-4 py-1 text-sm border border-b-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-500",
                active
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              ].join(" ")}>
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-2">
        {tab === "profile" && <ProfileForm user={user} />}
        {tab === "security" && <SecurityForm />}
        {tab === "notifications" && <NotificationsForm />}
      </div>
    </div>
  );
}

function ProfileForm({ user }: { user: UserDto }) {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      // TODO: PATCH /api/settings/profile
      // await fetch("/api/settings/profile", { method:"PATCH", body: JSON.stringify(data) })
      alert("Profil uppdaterad ✅");
    } catch {
      alert("Kunde inte uppdatera profilen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-md border border-slate-200 bg-white p-5 space-y-4 max-w-md shadow-sm">
      <div>
        <label
          className="block text-sm text-gray-700 font-semibold"
          htmlFor="name">
          Namn
        </label>
        <input
          id="name"
          name="name"
          defaultValue={user.name ?? ""}
          className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label
          className="block text-sm text-gray-700 font-semibold"
          htmlFor="email">
          E-post
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={user.email ?? ""}
          className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-slate-600 text-white px-4 py-2 text-sm hover:bg-slate-700 disabled:opacity-60">
        {pending ? "Sparar…" : "Spara"}
      </button>
    </form>
  );
}

function SecurityForm() {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const f = new FormData(e.currentTarget);
      const current = String(f.get("currentPassword") ?? "");
      const pw = String(f.get("newPassword") ?? "");
      const conf = String(f.get("confirm") ?? "");

      if (!current) {
        alert("Fyll i nuvarande lösenord.");
        return;
      }
      if (pw.length < 8) {
        alert("Lösenord måste vara minst 8 tecken.");
        return;
      }
      if (pw !== conf) {
        alert("Lösenorden matchar inte.");
        return;
      }
      // TODO: POST /api/settings/password
      // await fetch("/api/settings/password", { method: "POST", body: JSON.stringify({ current, pw }) })
      alert("Lösenord uppdaterat ✅");
    } catch {
      alert("Kunde inte uppdatera lösenordet.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-md border border-slate-200 bg-white p-5 space-y-4 max-w-md shadow-sm">
      <div>
        <label
          className="block text-sm text-gray-700"
          htmlFor="currentPassword">
          Nuvarande lösenord
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          autoComplete="current-password"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700" htmlFor="newPassword">
          Nytt lösenord
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          autoComplete="new-password"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700" htmlFor="confirm">
          Bekräfta nytt lösenord
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          autoComplete="new-password"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 border-gray-300 cursor-pointer rounded accent-zinc-600"
            name="twofa"
          />
          Aktivera 2FA (placeholder)
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-700 text-white px-4 py-2 text-sm hover:bg-slate-600 shadow-sm disabled:opacity-60">
          {pending ? "Sparar…" : "Spara"}
        </button>
      </div>
    </form>
  );
}

function NotificationsForm() {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      // TODO: PATCH /api/settings/notifications
      // await fetch("/api/settings/notifications", { method:"PATCH", body: JSON.stringify(data) })
      alert("Notiser uppdaterade ✅");
    } catch {
      alert("Kunde inte uppdatera notiser.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-md border border-slate-200 bg-white p-5 space-y-4 max-w-md shadow-sm">
      <Toggle
        name="emailInvites"
        label="Maila mig vid inbjudningar"
        defaultChecked
      />
      <Toggle name="listUpdates" label="Maila mig när listor uppdateras" />
      <Toggle
        name="purchaseMarks"
        label="Meddela när någon markerar ett köp"
        defaultChecked
      />
      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-700 text-white px-4 py-2 text-sm hover:bg-slate-600 cursor-pointer disabled:opacity-60">
          {pending ? "Sparar…" : "Spara"}
        </button>
      </div>
    </form>
  );
}

function Toggle({
  name,
  label,
  defaultChecked
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded accent-slate-600 cursor-pointer"
      />
    </label>
  );
}
