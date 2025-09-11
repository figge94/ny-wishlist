export function UserName({ user }: { user: string }) {
  return <span className="text-sm text-gray-700">Inloggad som {user}</span>;
}
