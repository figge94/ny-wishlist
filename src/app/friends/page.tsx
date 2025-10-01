// app/friends/page.tsx
"use client";

import BackToDashboard from "@/components/BackToDashboard";
import { useFriends } from "./_hooks/useFriends";
import { FriendsGrid } from "./_components/FriendsGrid";
import { RequestsList } from "./_components/RequestsList";
import { InviteForm } from "./_components/InviteForm";

export default function FriendsPage() {
  const {
    loading,
    error,
    friends,
    requests,
    accept,
    decline,
    removeFriend,
    invite
  } = useFriends();

  return (
    <div className="space-y-8">
      <BackToDashboard />

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-slate-800">Vänner</h1>
      </div>

      {error && (
        <p className="text-sm text-rose-600">
          Kunde inte ladda data. Prova att uppdatera sidan.
        </p>
      )}

      {/* Dina vänner */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Dina vänner
        </h2>
        {loading ? (
          <p className="text-sm text-gray-500">Laddar…</p>
        ) : (
          <FriendsGrid items={friends} onRemove={removeFriend} />
        )}
      </section>

      {/* Förfrågningar */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Vänförfrågningar
        </h2>
        {loading ? (
          <p className="text-sm text-gray-500">Laddar…</p>
        ) : (
          <RequestsList
            requests={requests}
            onAccept={accept}
            onDecline={decline}
          />
        )}
      </section>

      {/* Bjud in */}
      <InviteForm onInvite={invite} />
    </div>
  );
}
