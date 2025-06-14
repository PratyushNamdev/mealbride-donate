import Link from "next/link";
import { LogOutButton } from "@atoms";

export function HeaderNavLinks({ donorId }: { donorId: string }) {
  return (
    <ul className="hidden sm:flex gap-8 items-center font-medium text-gray-700">
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        Home
      </li>
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        <Link href={`/profile/donor/${donorId}`}>Account</Link>
      </li>
      <li className="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:text-[#005e38] hover:border-[#005e38] transition-colors duration-300 select-none">
        <Link href={"/my-meals-history"}>History</Link>
      </li>
      <LogOutButton />
    </ul>
  );
}
