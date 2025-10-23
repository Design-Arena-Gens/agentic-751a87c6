import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula Labs | Web Development Agency",
  description:
    "Nebula Labs crafts bespoke digital experiences with full-service web design, development, and growth consulting.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
