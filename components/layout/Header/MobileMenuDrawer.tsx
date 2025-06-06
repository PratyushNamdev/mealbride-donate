"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@ui";
import { Skeleton } from "@ui";
import { History, Home, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";

export function MobileMenuDrawer({ userData, isOpen, onChange }: any) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetTrigger className="cursor-pointer" onClick={() => onChange(true)}>
        <Menu size={24} />
      </SheetTrigger>

      <SheetContent className="w-[75%] [@media(min-width:500px)]:w-[55%] sm:w-[50%] bg-white rounded-lg shadow-lg p-6">
        <SheetTitle className="text-3xl font-bold text-[#005e38] text-center mb-6 select-none">
          MealBridge
        </SheetTitle>

        <div className="flex flex-col items-center gap-3 mt-2">
          <div className="relative w-24 h-24">
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

          <div className="text-[#005e38] font-semibold text-lg truncate max-w-full text-center">
            {userData?.username || "Anonymous"}
          </div>
          <div className="text-sm text-gray-600 max-w-full text-center break-words">
            {userData?.email || "No email available"}
          </div>
        </div>

        <ul className="flex flex-col gap-5 mt-12 text-gray-700 font-semibold px-1">
          {[
            { icon: <Home />, label: "Home" },
            { icon: <History />, label: "History" },
            { icon: <User />, label: "Account" },
            { icon: <LogOut />, label: "Logout" },
          ].map(({ icon, label }) => (
            <li
              key={label}
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
