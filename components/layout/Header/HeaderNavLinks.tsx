import Link from "next/link";
import { Bell } from "lucide-react";
import { useNotifications } from "@/providers/notification_provider";

export function HeaderNavLinks({ donorId }: { donorId: string }) {
  const { hasUnseenNotifications, setIsDrawerOpen } = useNotifications();
  return (
    <ul className="hidden sm:flex gap-8 items-center font-medium text-gray-700">
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        <Link href={`/`}>Home</Link>
      </li>
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        <Link href={`/profile/donor/${donorId}`}>Account</Link>
      </li>
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        <Link href={"/my-meals-history"}>History</Link>
      </li>
      <li
        className="relative cursor-pointer"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Bell className="w-5 h-5" />
        {hasUnseenNotifications && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        )}
      </li>
    </ul>
  );
}
