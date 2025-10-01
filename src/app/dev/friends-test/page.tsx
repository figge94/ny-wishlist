"use client";
import { useState } from "react";

// Lägg in de två riktiga User.id från Prisma Studio
const A = "cmg8i5mnn0000iaew3d7czkma"; // Anna
const B = "cmg8i5mnw0001iaew29v9ugha"; // Bert

async function send(fromUserId: string, toUserId: string) {
  const res = await fetch("/api/friend-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fromUserId, toUserId })
  });
  if (!res.ok) throw new Error(await res.text());
}

export default function FriendsTestPage() {
  const [msg, setMsg] = useState("");

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-lg font-medium">Testa vänförfrågningar</h1>
      <div className="flex gap-2">
        <button
          onClick={async () => {
            setMsg("Skickar A → B…");
            try {
              await send(A, B);
              setMsg("Skickad A → B ✅");
            } catch (e) {
              setMsg("Fel A → B ❌");
            }
          }}
          className="px-3 py-1.5 rounded bg-blue-600 text-white">
          Skicka A → B
        </button>
        <button
          onClick={async () => {
            setMsg("Skickar B → A…");
            try {
              await send(B, A);
              setMsg("Skickad B → A ✅");
            } catch (e) {
              setMsg("Fel B → A ❌");
            }
          }}
          className="px-3 py-1.5 rounded bg-blue-600 text-white">
          Skicka B → A
        </button>
      </div>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
      <p className="text-xs text-gray-500">
        Öppna <code>npx prisma studio</code> för att se FriendRequest-raderna.
        Du kan återanvända din befintliga “Vänförfrågningar”-vy om du vill lista
        dem.
      </p>
    </div>
  );
}
