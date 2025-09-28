// components/EmptyState.tsx
type EmptyStateProps = {
  message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="mt-10 rounded-md border border-dashed p-8 text-center text-muted-foreground dark:border-zinc-700">
      {message}
    </div>
  );
}
