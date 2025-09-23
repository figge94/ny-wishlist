// app/wishlist/[id]/not-found.tsx
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Listan hittades inte</h1>
      <p className="text-gray-600 mt-1">
        Kontrollera länken eller gå tillbaka till önskelistor.
      </p>
    </div>
  );
}
