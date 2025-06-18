"use client";

import { logout } from "../../../lib/logout";
import { Button } from "@ui";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout(router);
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
