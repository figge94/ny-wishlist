// app/friends/page.tsx
"use client";
import BackToDashboard from "@/components/BackToDashboard";
import { useFriends } from "./_hooks/useFriends";
import { SearchBox } from "./_components/SearchBox";
import { FriendsGrid } from "./_components/FriendsGrid";
import { RequestsList } from "./_components/RequestsList";
import { InviteForm } from "./_components/InviteForm";

export default function FriendsPage() {
  const {
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
  } = useFriends();

  return (
    <div className="space-y-8">
      <BackToDashboard />

      <div className="flex items-center gap-3">
        <h1 className="text-xl font-medium text-slate-800">Vänner</h1>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {/* Dina vänner */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">Dina vänner</h2>
        <FriendsGrid items={filtered} onRemove={removeFriend} />
      </section>

      {/* Förfrågningar */}
      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          Vänförfrågningar
        </h2>
        <RequestsList
          requests={requests}
          onAccept={accept}
          onDecline={decline}
        />
      </section>

      {/* Bjud in */}
      <InviteForm
        email={inviteEmail}
        setEmail={setInviteEmail}
        onInvite={invite}
      />
    </div>
  );
}
