import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Quicksand } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand'
});

export const metadata = {
  title: 'Filecoin Developer Console',
  description: 'A comprehensive toolkit for Filecoin development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable}`}>
      <body className="font-quicksand">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
