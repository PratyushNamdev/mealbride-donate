"use client";

import { useEffect } from "react";

export default function ClientWrapper({
  donorId,
  children,
}: {
  donorId: string | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (donorId) {
      localStorage.setItem("donor_id", donorId);
    }
  }, [donorId]);

  return <>{children}</>;
}
