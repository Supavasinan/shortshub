
export default async function AuthIndex({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-start md:items-center justify-center ">
      {children}
    </div>
  )
}
