import Search from '@/components/search'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Search />
      {children}
    </>
  )
}
