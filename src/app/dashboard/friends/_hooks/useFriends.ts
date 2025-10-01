// app/friends/_hooks/useFriends.ts
"use client";
import { useMemo, useState } from "react";
import type { Friend } from "../_types";

export function useFriends() {
  const [query, setQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Anna Svensson", email: "anna@example.com" },
    { id: "2", name: "Johan Nilsson", email: "johan@example.com" }
  ]);
  const [requests, setRequests] = useState<Friend[]>([
    { id: "3", name: "Lisa Karlsson", email: "lisa@example.com" }
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

  return {
    // state
    query,
    setQuery,
    inviteEmail,
    setInviteEmail,
    friends,
    requests,
    // derived
    filtered,
    // actions
    accept,
    decline,
    removeFriend,
    invite
  } as const;
}
