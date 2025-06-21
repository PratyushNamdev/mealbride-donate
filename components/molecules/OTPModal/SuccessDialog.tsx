import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessDialog({
  open,
  onClose,
  onGoHome,
  onViewHistory,
}: {
  open: boolean;
  onClose: () => void;
  onGoHome: () => void;
  onViewHistory: () => void;
}) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 max-w-md mx-auto shadow-2xl border-2 border-green-100">
        {/* <div > */}
        <DialogHeader className="flex flex-col items-center gap-2 pb-4 border-b border-green-200">
          <div className="p-3 bg-green-100 rounded-full">
            <Trophy className="w-10 h-10 text-green-600" />
          </div>
          <DialogTitle className="text-4xl font-bold bg-gradient-to-r from-[#278049] to-green-500 bg-clip-text text-transparent pb-1">
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-md text-gray-600 text-center px-3 ">
            You’ve successfully donated a meal 🎉
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-stretch mx-auto">
          <Button
            onClick={() => {
              onClose();
              onGoHome();
            }}
            className="border-none bg-green-600 font-medium flex items-center hover:bg-green-700 cursor-pointer"
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              onViewHistory();
            }}
            className="text-green-500 font-medium flex items-center hover:text-green-600 cursor-pointer"
          >
            View Donation History
          </Button>
        </DialogFooter>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
}
