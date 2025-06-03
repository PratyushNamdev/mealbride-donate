"use client";
import { useGetUserProfile } from "@/api/user/hooks/get_user_profile";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui";

import { History, Home, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [userId, setUserId] = useState("");
  const userType = "donor";

  useEffect(() => {
    const id = localStorage.getItem("donor_id");
    if (id) setUserId(id);
  }, []);

  const { data, isLoading } = useGetUserProfile({ id: userId, userType });

  return (
    <nav className="w-full h-[10dvh] px-8 md:px-20 py-4 flex items-center justify-between bg-white">
      <div className="font-bold text-gray-700 text-lg select-none">
        MealBridge
      </div>
      <ul className="hidden sm:flex gap-8 items-center font-medium text-gray-700">
        <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300">
          Home
        </li>
        <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300">
          History
        </li>
        <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300">
          Account
        </li>
        <Button
          variant="primary"
          size="lg"
          className="cursor-pointer bg-[#005e38] hover:bg-[#5bb780] text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300"
        >
          Logout
        </Button>
      </ul>
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent className="w-[75%] [@media(min-width:500px)]:w-[55%] sm:w-[50%] bg-white rounded-lg shadow-lg p-6">
            <SheetTitle className="text-3xl font-bold text-[#005e38] text-center mb-6 select-none">
              MealBridge
            </SheetTitle>

            <div className="flex flex-col items-center gap-3 mt-2">
              <Image
                src={data?.profilePicture || "/default-profile.png"}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-[#005e38]"
              />
              <div className="text-[#005e38] font-semibold text-lg truncate max-w-full text-center">
                {data?.username || "Anonymous"}
              </div>
              <div className="text-sm text-gray-600 max-w-full text-center break-words">
                {data?.email || "No email available"}
              </div>
            </div>

            <ul className="flex flex-col gap-5 mt-12 text-gray-700 font-semibold px-1">
              {[
                { icon: <Home size={20} />, label: "Home" },
                { icon: <History size={20} />, label: "History" },
                { icon: <User size={20} />, label: "Account" },
                { icon: <LogOut size={20} />, label: "Logout" },
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
      </div>
    </nav>
  );
}
