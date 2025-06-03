"use client";

import { useRouter } from "next/navigation";
import { Button } from "@ui";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="text-[#005e38] font-medium flex items-center gap-1 leading-none cursor-pointer"
      aria-label="Go back to previous page"
    >
      <span className="flex items-center justify-center">
        <ChevronLeft className="w-4 h-4 " />
      </span>
      <span className="flex items-center">Back</span>
    </Button>
  );
}
