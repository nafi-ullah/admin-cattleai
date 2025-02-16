import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React
import { Toaster } from "react-hot-toast"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cattle Weight Prediction Admin Dashboard",
  description: "Admin dashboard for managing the Cattle Weight Prediction system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
        {children}</body>
    </html>
  )
}

