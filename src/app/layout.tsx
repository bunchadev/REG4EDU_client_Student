import StyledComponentsRegistry from '@/lib/antd.registry'
import type { Metadata } from 'next'
import '../styles/app.css'
import NextAuthWrapper from '@/lib/next.auth.wrapper'
import { CheckContextProvider } from '@/lib/check.wrapper'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <NextAuthWrapper>
            <CheckContextProvider>
             {children}
            </CheckContextProvider>
          </NextAuthWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
