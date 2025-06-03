import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your App",
  description: "App description",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="h-dvh">{children}</div>
    </div>
  );
}
