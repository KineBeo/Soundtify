import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StoreProvider";
import AudioHandler from "@/components/AudioHandler";
import Player from "@/components/AudioPlayer/Player";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soundtify",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <StoreProvider>
          <Sidebar>
            {children}
          </Sidebar>
          <Player />
          <AudioHandler />
        </StoreProvider>
      </body>
    </html>
  );
}
