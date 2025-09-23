export function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md bg-white drop-shadow-sm p-3 ${className}`}>
      {children}
    </div>
  );
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-slate-600">{children}</h3>;
}
export function CardValue({ children }: { children: React.ReactNode }) {
  return <div className="text-2xl font-bold mt-1">{children}</div>;
}
