"use client";
import { useState } from "react";

type Props = { user: { name?: string; email?: string } };

export default function SettingsClient({ user }: Props) {
  const [tab, setTab] = useState<"profile" | "security" | "notifications">(
    "profile"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Inställningar</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { k: "profile", label: "Profil" },
          { k: "security", label: "Säkerhet" },
          { k: "notifications", label: "Notiser" }
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={[
              "rounded-full px-4 py-1 text-sm border",
              tab === t.k
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            ].join(" ")}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "profile" && <ProfileForm user={user} />}
      {tab === "security" && <SecurityForm />}
      {tab === "notifications" && <NotificationsForm />}
    </div>
  );
}

function ProfileForm({ user }: Props) {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // TODO: PATCH /api/settings/profile
    alert("Profil uppdaterad ✅");
  }
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 max-w-lg shadow-sm">
      <div>
        <label className="block text-sm text-gray-700">Namn</label>
        <input
          name="name"
          defaultValue={user.name ?? ""}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">E-post</label>
        <input
          name="email"
          type="email"
          defaultValue={user.email ?? ""}
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button className="rounded-xl bg-slate-600 text-white px-4 py-2 text-sm hover:bg-slate-700">
        Spara
      </button>
    </form>
  );
}

function SecurityForm() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pw = String(f.get("newPassword") ?? "");
    const conf = String(f.get("confirm") ?? "");
    if (pw.length < 8) return alert("Lösenord måste vara minst 8 tecken.");
    if (pw !== conf) return alert("Lösenorden matchar inte.");
    // TODO: POST /api/settings/password
    alert("Lösenord uppdaterat ✅");
  }
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 max-w-lg shadow-sm">
      <div>
        <label className="block text-sm text-gray-700">
          Nuvarande lösenord
        </label>
        <input
          name="currentPassword"
          type="password"
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Nytt lösenord</label>
        <input
          name="newPassword"
          type="password"
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">
          Bekräfta nytt lösenord
        </label>
        <input
          name="confirm"
          type="password"
          className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            name="twofa"
          />
          Aktivera 2FA (placeholder)
        </label>
        <button className="rounded-xl bg-slate-600 text-white px-4 py-2 text-sm hover:bg-slate-700">
          Spara
        </button>
      </div>
    </form>
  );
}

function NotificationsForm() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: PATCH /api/settings/notifications
    alert("Notiser uppdaterade ✅");
  }
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4 max-w-lg shadow-sm">
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
        <button className="rounded-xl bg-slate-600 text-white px-4 py-2 text-sm hover:bg-slate-700">
          Spara
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
        className="h-5 w-9 rounded-full accent-slate-500"
      />
    </label>
  );
}
