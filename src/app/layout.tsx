import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/shadcn/theme-provider'
import SessionProvider from '@/components/SessionProvider'
import Header from '@/components/header/header'
import Menu from '@/components/header/menu'
import { TailwindIndicator } from '@/components/shadcn/tailwind-indicator'
import { cn } from '@/lib/utils'
import getSession from '@/lib/auth'
import { GeistSans } from "geist/font";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Gabi Tasting',
  description: 'A wine tasting App to help tasting and rating wines. A service of Gabi Zimmer.',
  icons: {
    icon: "/favicon.ico",
  },  
}

export const viewport: Viewport = {
  themeColor: "light",  
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session= await getSession()
  return (    
    <>
      <html lang="es" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", GeistSans.className)}>
            <SessionProvider session={session}>
          

            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="container relative flex flex-col min-h-screen mt-1 text-muted-foreground">
                <Header><Menu /></Header> 

                <div className="flex flex-col items-center flex-1">
                  {children}
                  <Analytics />
                  <Toaster />
                </div>
              </div>            
              <TailwindIndicator />
            </ThemeProvider>

            </SessionProvider>
        </body>
      </html>
    </>
  )
}
