"use client";
import { useEffect, useState } from "react";
import { HeaderNavLinks } from "./HeaderNavLinks";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import NotificationDrawer from "./NotificationDrawer";
import DonorHooks from "@DonorHooks";
import { Bell } from "lucide-react";
import { useNotifications } from "@/providers/notification_provider";
export default function Header() {
  const [donorId, setDonorId] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { hasUnseenNotifications, setIsDrawerOpen } = useNotifications();

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
    const handleCustomEvent = () => {
      const id = localStorage.getItem("donor_id");
      if (id) setDonorId(id);
    };

    window.addEventListener("id_saved_to_localstorage", handleCustomEvent);
    return () => {
      window.removeEventListener("id_saved_to_localstorage", handleCustomEvent);
    };
  }, []);

  const { data } = DonorHooks.useGetDonorProfile(donorId);

  return (
    <nav className="w-full h-[10dvh] px-8 md:px-20 py-4 flex items-center justify-between bg-white">
      <div className="font-bold text-gray-700 text-lg select-none">
        MealBridge
      </div>
      <HeaderNavLinks donorId={donorId} />
      <div className="sm:hidden flex items-center gap-4">
        <div
          className="relative cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Bell className="w-5 h-5" />
          {hasUnseenNotifications && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
          )}
        </div>
        <MobileMenuDrawer
          userData={data}
          isOpen={isSheetOpen}
          onChange={setIsSheetOpen}
        />
      </div>
      <NotificationDrawer />
    </nav>
  );
}
