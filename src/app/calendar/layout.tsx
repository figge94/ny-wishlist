import Search from "@/components/SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Search />
      {children}
    </>
  );
}
