import type { Metadata } from "next";
import SocketProvider from "@/providers/SocketProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MealBridge Donate",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
        {children}
        </SocketProvider>
      </body>
    </html>
  );
}
