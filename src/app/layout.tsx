// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduk.AI",
  description: "Sistema de gestão escolar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700
          text-white min-h-screen flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700`}
      >
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
