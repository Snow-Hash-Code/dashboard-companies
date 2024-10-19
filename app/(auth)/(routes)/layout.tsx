import { Logo } from "@/components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col place-content-center place-items-center h-full">
      <Logo />
      <h1 className="text-3xl my-4">Welcome to my dashboard</h1>
      <h2 className="text-2xl mb-3">nvrz Dashboard</h2>
      {children}
    </div>
  )
}