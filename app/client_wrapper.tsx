"use client";

import { useEffect } from "react";

export default function ClientWrapper({
  donorId,
  token,
  children,
}: {
  donorId: string | null;
  token: string | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (donorId) {
      localStorage.setItem("donor_id", donorId);
    }
    if (token) {
      localStorage.setItem("donor_token", token);
    }
  }, [donorId]);

  return <>{children}</>;
}
