// lib/api/friends.ts
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function json<T>(res: Response): Promise<ApiResult<T>> {
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    return { ok: false, error: msg || `HTTP ${res.status}` };
  }
  const data = (await res.json()) as T;
  return { ok: true, data };
}

export async function getFriends() {
  return json<Friend[]>(await fetch("/api/friends", { cache: "no-store" }));
}

export async function getFriendRequests() {
  return json<Friend[]>(
    await fetch("/api/friend-requests", { cache: "no-store" })
  );
}

export async function inviteFriend(email: string) {
  return json<{ message: string }>(
    await fetch("/api/friends", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
  );
}

export async function acceptRequest(id: string) {
  return json<{ moved: string }>(
    await fetch("/api/friend-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "accept", id })
    })
  );
}

export async function declineRequest(id: string) {
  return json<{ removed: string }>(
    await fetch("/api/friend-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "decline", id })
    })
  );
}

export async function removeFriend(id: string) {
  return json<{ removed: string }>(
    await fetch(`/api/friends/${id}`, { method: "DELETE" })
  );
}
