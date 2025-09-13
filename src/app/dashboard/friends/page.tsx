"use client";
import { useMemo, useState } from "react";
import BackToDashboard from "@/components/back-to-dashboard";

type Friend = { id: string; name: string; email: string };

export default function FriendsPage() {
  const [query, setQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Anna Svensson", email: "anna@example.com" },
    { id: "2", name: "Johan Nilsson", email: "johan@example.com" },
  ]);
  const [requests, setRequests] = useState<Friend[]>([
    { id: "3", name: "Lisa Karlsson", email: "lisa@example.com" },
  ]);

  const filtered = useMemo(
    () =>
      friends.filter((f) =>
        [f.name, f.email].some((v) =>
          v.toLowerCase().includes(query.toLowerCase())
        )
      ),
    [friends, query]
  );

  function accept(id: string) {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setFriends((prev) => [...prev, req]);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  function decline(id: string) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  function removeFriend(id: string) {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  }

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail) return;
    // TODO: POST /api/friends/invite
    alert(`Inbjudan skickad till ${inviteEmail} ✅`);
    setInviteEmail("");
  }

  return (
    <div className="space-y-8">
      <BackToDashboard />
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-800">Vänner</h1>
        <div className="ml-auto w-full max-w-xs">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök vän…"
            className="w-full border border-gray-300 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Dina vänner */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Dina vänner</h2>
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500">
            Inga vänner matchar din sökning.
          </p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-3 rounded-xl border bg-white p-3">
                <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-sm font-medium">
                  {f.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {f.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{f.email}</p>
                </div>
                <button
                  onClick={() => removeFriend(f.id)}
                  className="ml-auto text-xs text-red-600 hover:underline">
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Förfrågningar */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          Vänförfrågningar
        </h2>
        {requests.length === 0 ? (
          <p className="text-sm text-gray-500">Inga väntande förfrågningar.</p>
        ) : (
          <ul className="space-y-2">
            {requests.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-xl border bg-white p-3">
                <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center text-xs font-medium">
                  {r.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{r.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => accept(r.id)}
                    className="text-xs text-white bg-indigo-600 px-2.5 py-1 rounded-lg hover:bg-indigo-700">
                    Acceptera
                  </button>
                  <button
                    onClick={() => decline(r.id)}
                    className="text-xs text-gray-700 border px-2.5 py-1 rounded-lg hover:bg-gray-100">
                    Avböj
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bjud in */}
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-sm font-medium text-gray-700">Bjud in vän</h2>
        <form
          onSubmit={invite}
          className="mt-3 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="namn@exempel.se"
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700">
            Skicka inbjudan
          </button>
        </form>
      </section>
    </div>
  );
}
