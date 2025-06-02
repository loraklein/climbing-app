import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto_Slab } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Local Crag Explorer',
  description: 'Discover and track climbing routes in your area',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${robotoSlab.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}