"use client";

import { Button } from "@ui";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function DonateNowButton() {
  const router = useRouter();
  const handleDonateNow = () => {
    router.push("./donate-now");
  };
  return (
    <Button
      variant="primary"
      size="lg"
      className="cursor-pointer"
      onClick={handleDonateNow}
    >
      Donate Now
      <MoveRight className="ml-2 size-4" />
    </Button>
  );
}
