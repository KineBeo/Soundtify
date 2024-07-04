import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StoreProvider";
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
        </StoreProvider>
      </body>
    </html>
  );
}
