"use client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RouterInstance = ReturnType<typeof useRouter>;
export async function logout(router: RouterInstance) {
  toast.loading("Logging out...");
  await fetch("/api/logout");
  localStorage.removeItem("donor_id");
  localStorage.removeItem("donor_token");
  router.push("/signin");
  toast.dismiss();
}
