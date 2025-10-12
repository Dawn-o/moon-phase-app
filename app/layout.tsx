import type { Metadata } from "next";
import { VT323, Space_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "MOON.SYS v1.0",
  description: "Lunar Phase Tracking System • Terminal Interface",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${vt323.variable} ${spaceMono.variable} ${orbitron.variable} font-mono antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
