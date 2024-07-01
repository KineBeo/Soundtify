import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./StoreProvider";
const font = Figtree({ subsets: ["latin"] });

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
    <StoreProvider>
      <html lang="en">
        <body className={font.className}>
          <Sidebar>
            {children}
          </Sidebar>
        </body>
      </html>

    </StoreProvider>
  );
}
