import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GameProvider } from './context/gameContext';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Citadelles Project",
  description: "Jeu de cartes Citadelles en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GameProvider players={[]}>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}