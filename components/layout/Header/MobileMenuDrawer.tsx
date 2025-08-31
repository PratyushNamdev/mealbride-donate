"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@ui";
import { Skeleton } from "@ui";
import { HandPlatter, History, Home, LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "../../../lib/logout";
import { GetDonorProfileResponseDTO } from "@/apiCalls/donor/dto/response/get_donor_profile.dto";

interface MobileMenuDrawerProps {
  userData: GetDonorProfileResponseDTO | undefined;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
}

export function MobileMenuDrawer({
  userData,
  isSheetOpen,
  setIsSheetOpen,
}: MobileMenuDrawerProps) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsSheetOpen(false);
    await logout(router);
  };

  const handleAccountClick = () => {
    setIsSheetOpen(false);
    router.push(`/profile/donor/${userData?._id}`);
  };

  const handleHistoryClick = () => {
    setIsSheetOpen(false);
    router.push(`/my-meals-history`);
  };

  const handleHomeClick = () => {
    setIsSheetOpen(false);
    router.push(`/`);
  };

  const handleMyDonationClick = () => {
    setIsSheetOpen(false);
    router.push(`/my-active-meals`);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger
        className="cursor-pointer"
        onClick={() => setIsSheetOpen(true)}
      >
        <Menu size={24} />
      </SheetTrigger>

      <SheetContent className="w-[75%] [@media(min-width:500px)]:w-[55%] sm:w-[50%] bg-white rounded-lg shadow-lg p-6">
        <SheetTitle className="text-3xl font-bold text-[#005e38] text-center mb-6 select-none">
          MealBridge
        </SheetTitle>

        <div
          className="flex flex-col items-center gap-3 mt-2"
          onClick={handleAccountClick}
        >
          <div className="relative w-24 h-24 cursor-pointer">
            {!isImgLoaded && (
              <Skeleton className="rounded-full w-full h-full" />
            )}

            <Image
              src={userData?.profilePicture || "/default-profile.png"}
              alt="Profile"
              width={96}
              height={96}
              className={
                "rounded-full object-cover transition-opacity duration-300 " +
                (isImgLoaded ? "opacity-100" : "opacity-0")
              }
              onLoadingComplete={() => setIsImgLoaded(true)}
            />
          </div>

          <div className="text-[#005e38] font-semibold text-lg truncate max-w-full text-center cursor-pointer">
            {userData?.username || "Anonymous"}
          </div>
          <div className="text-sm text-gray-600 max-w-full text-center break-words cursor-pointer">
            {userData?.email || "No email available"}
          </div>
        </div>

        <ul className="flex flex-col gap-5 mt-12 text-gray-700 font-semibold px-1">
          {[
            { icon: <Home />, label: "Home", clickFunction: handleHomeClick },
            {
              icon: <HandPlatter />,
              label: "My Donations",
              clickFunction: handleMyDonationClick,
            },
            {
              icon: <History />,
              label: "History",
              clickFunction: handleHistoryClick,
            },
            {
              icon: <LogOut />,
              label: "Logout",
              clickFunction: handleLogout,
            },
          ].map(({ icon, label, clickFunction }) => (
            <li
              key={label}
              onClick={clickFunction}
              className="flex items-center gap-3 px-5 py-3 rounded-md cursor-pointer hover:bg-[#e6f4ea] hover:text-[#005e38] transition-colors duration-300 select-none"
            >
              {icon}
              <span className="text-base">{label}</span>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
