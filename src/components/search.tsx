export default function Search() {
  return (
    <form className="p-3 md:p-6">
      <input
        className="border border-slate-300 rounded-lg px-3 py-2 w-full inset-shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-800 text-sm bg-white"
        placeholder="Sök…"
      />
    </form>
  );
}
