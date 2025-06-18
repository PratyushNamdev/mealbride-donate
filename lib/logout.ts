"use client";
import { toast } from "sonner";

export async function logout(router: any) {
  toast.loading("Logging out...");
  await fetch("/api/logout");
  localStorage.removeItem("donor_id");
  localStorage.removeItem("donor_token");
  router.push("/signin");
  toast.dismiss();
}
