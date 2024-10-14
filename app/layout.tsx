import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Jeux Olympiques',
   description: 'Classements des Jeux Olympiques',
}

export default function RootLayout({
                                      children,
                                   }: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="fr">
         <body className={inter.className}>
         {children}
         </body>
      </html>
   )
}
