import '../../styles/app.css'
import HeaderApp from '@/components/header/header'
import MainApp from '@/components/main/main.app'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/auth.options'
import { redirect } from 'next/navigation'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
     redirect("/auth/signin")
  }
  return (
    <>
        <HeaderApp/>
        <MainApp>{children}</MainApp>
    </>
  )
}