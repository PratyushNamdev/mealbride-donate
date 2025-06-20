import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import OtpHooks from "@/api/otp/hooks";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@ui";
import { User } from "lucide-react";

interface OtpModalProps {
  mealId: string;
}

const OTP_LENGTH = 4;
const QUERY_KEYS = [
  "get-active-meal-detail",
  "get-active-meal",
  "get-meal-history",
] as const;

export default function OtpModal({ mealId }: OtpModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isDelivered, setIsDelivered] = useState(false);

  useEffect(() => {
    if (isDelivered) {
      router.replace(`/my-active-meals/${mealId}`);
    }
  }, [isDelivered, router, mealId]);

  if (pathname.startsWith("/my-meals-history")) {
    return null;
  }

  const onVerifySuccess = () => {
    toast.success("Donation done successfully");
    QUERY_KEYS.forEach((key) =>
      queryClient.invalidateQueries({ queryKey: [key] })
    );
    setOtp("");
    setOpen(false);
    setIsDelivered(true);
  };

  const onVerifyError = (error: unknown) => {
    console.error("OTP verification failed:", error);
    toast.error("Failed to verify OTP. Please try again.");
  };

  const { mutate: verifyOTP, isPending } = OtpHooks.useVerifyOtp({
    onSuccess: onVerifySuccess,
    onError: onVerifyError,
  });

  const handleSubmit = () => {
    if (otp.length !== OTP_LENGTH) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    verifyOTP({ mealId, otp });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => setOpen(true)}
        >
          <User className="h-4 w-4 mr-2" />
          Confirm Handover
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-center flex flex-col items-center gap-2">
          <DrawerTitle>Confirm Handover</DrawerTitle>
          <DrawerDescription>
            Enter the OTP provided by the collector to verify and complete the
            handover securely.
          </DrawerDescription>
          <InputOTP
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={setOtp}
            className="mt-4"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </DrawerHeader>

        <DrawerFooter className="flex flex-row flex-wrap gap-2 justify-center mx-auto">
          <Button
            onClick={handleSubmit}
            disabled={isPending || otp.length !== OTP_LENGTH || isDelivered}
            aria-label="Confirm OTP"
            className="px-6 py-3 bg-green-600 hover:bg-green-700"
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            aria-label="Cancel OTP Confirmation"
            className="px-6 py-3"
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
