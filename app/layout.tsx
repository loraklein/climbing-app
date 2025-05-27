import type { Metadata } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const robotoSlab = Roboto_Slab({ 
  subsets: ['latin'],
  variable: '--font-roboto-slab'
})

export const metadata: Metadata = {
  title: 'Local Crag Explorer',
  description: 'Discover climbing routes in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${robotoSlab.variable}`}>
        {children}
      </body>
    </html>
  )
}