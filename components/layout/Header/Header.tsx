"use client";
import { useEffect, useState } from "react";
import { useGetUserProfile } from "@/api/user/hooks/get_user_profile";
import { HeaderNavLinks } from "./HeaderNavLinks";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

export default function Header() {
  const [userId, setUserId] = useState("");
  const userType = "donor";
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSheetOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("donor_id");
    if (id) setUserId(id);
  }, []);

  const { data } = useGetUserProfile({ id: userId, userType });

  return (
    <nav className="w-full h-[10dvh] px-8 md:px-20 py-4 flex items-center justify-between bg-white">
      <div className="font-bold text-gray-700 text-lg select-none">
        MealBridge
      </div>
      <HeaderNavLinks />
      <div className="sm:hidden">
        <MobileMenuDrawer
          userData={data}
          isOpen={isSheetOpen}
          onChange={setIsSheetOpen}
        />
      </div>
    </nav>
  );
}
