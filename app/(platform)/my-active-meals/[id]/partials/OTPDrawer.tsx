import React, { useState } from "react";
import { toast } from "sonner";
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
import OTPHooks from "@/api/OTP/hooks";

interface OTPDrawerProps {
  mealId: string;
  setShowSuccessPopup: (show: boolean) => void;
}

const OTP_LENGTH = 4;

export default function OTPDrawer({
  mealId,
  setShowSuccessPopup,
}: OTPDrawerProps) {
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState("");

  const { mutate: verifyOTP, isPending } = OTPHooks.useVerifyOTP({
    onSuccess: () => {
      setShowSuccessPopup(true);
      setOTP("");
      setOpen(false);
      toast.success("Donation done successfully");
    },
    onError: () => {
      toast.error("Failed to verify OTP. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (OTP.length !== OTP_LENGTH) {
      toast.error("Please enter a valid OTP.");
      return;
    }
    verifyOTP({ mealId, otp: OTP });
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
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
              value={OTP}
              onChange={setOTP}
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
              disabled={isPending || OTP.length !== OTP_LENGTH}
              aria-label="Confirm OTP"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
              aria-label="Cancel OTP Confirmation"
              className="px-6 py-3 cursor-pointer"
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
