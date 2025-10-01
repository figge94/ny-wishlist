// app/friends/_hooks/useFriends.ts
"use client";

import useSWR, { useSWRConfig } from "swr";
import type { Friend } from "../_types";
import {
  getFriends,
  getFriendRequests,
  inviteFriend,
  acceptRequest,
  declineRequest,
  removeFriend as apiRemoveFriend,
  type ApiResult
} from "@/lib/api/friends";

// Valfritt: om du validerar med Zod i _types kan du importera och använda där.
// import { FriendSchema } from "../_types";

export function useFriends() {
  // Hämta listor
  const {
    data: friendsRes,
    isLoading: loadingFriends,
    error: errFriends
  } = useSWR("friends", getFriends, { revalidateOnFocus: false });

  const {
    data: reqRes,
    isLoading: loadingReq,
    error: errReq
  } = useSWR("friend-requests", getFriendRequests, {
    revalidateOnFocus: false
  });

  // Normalisera data (utan Zod för enkelhet)
  const friends: Friend[] = friendsRes?.ok ? friendsRes.data : [];
  const requests: Friend[] = reqRes?.ok ? reqRes.data : [];

  const { mutate } = useSWRConfig();

  // ---- Actions (enklaste varianten: anropa API, revalidate efteråt) ----
  async function accept(id: string) {
    const res = await acceptRequest(id);
    if (!res.ok) throw new Error(res.error);
    await mutate("friends");
    await mutate("friend-requests");
  }

  async function decline(id: string) {
    const res = await declineRequest(id);
    if (!res.ok) throw new Error(res.error);
    await mutate("friend-requests");
  }

  async function removeFriend(id: string) {
    const res = await apiRemoveFriend(id);
    if (!res.ok) throw new Error(res.error);
    await mutate("friends");
  }

  async function invite(email: string) {
    const res = await inviteFriend(email);
    if (!res.ok) throw new Error(res.error);
    await mutate("friend-requests");
  }

  return {
    // loading/error
    loading: loadingFriends || loadingReq,
    error: errFriends || errReq,
    // data
    friends,
    requests,
    // actions
    accept,
    decline,
    removeFriend,
    invite
  } as const;
}
