// app/users/page.tsx (client)
"use client";
import { sendFriendRequestAction } from "./actions";

function SendButton({ toUserId }: { toUserId: string }) {
  return (
    <form
      action={async (formData) => {
        await sendFriendRequestAction(formData);
      }}>
      <input type="hidden" name="toUserId" value={toUserId} />
      <button
        type="submit"
        className="px-3 py-1.5 rounded bg-blue-600 text-white">
        Skicka vänförfrågan
      </button>
    </form>
  );
}
