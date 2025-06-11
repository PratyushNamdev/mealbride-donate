"use client";

import { Button } from "@ui";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    toast.loading("Logging out...");
    await fetch("/api/logout");
    localStorage.removeItem("donor_id");
    localStorage.removeItem("donor_token");
    router.push("/signin");
    toast.dismiss();
  };
  return (
    <Button
      variant="primary"
      size="lg"
      className="hover:bg-[#00734a] text-white font-semibold px-6 py-3 rounded-md shadow-sm select-none flex items-center gap-2 cursor-pointer"
      onClick={handleLogout}
    >
      Logout
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
