import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Round Table",
  description: "Seat history's greatest minds and pose them your questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-[#0a0704] text-amber-100">{children}</body>
    </html>
  );
}
