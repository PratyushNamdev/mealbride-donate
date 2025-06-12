import MealHooks from "@MealHooks";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui";
import { X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CancelDonation({ mealId }: { mealId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    mutate: cancelDonation,
    isPending,
    isError,
  } = MealHooks.useCancelMeal({
    onSuccess: () => {
      console.log("Donation cancelled successfully");
      toast.success("Donation cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["get-active-meal-detail"] });
      queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
      router.back();
    },
    onError: (error) => {
      console.error("Error cancelling donation:", error);
      toast.error("Failed to cancel donation. Please try again.");
    },
  });

  const handleCancelDonation = () => {
    cancelDonation({ mealId });
  };

  return (
    <Button
      variant="destructive"
      className="flex-1 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
      onClick={handleCancelDonation}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <X className="h-4 w-4 mr-2" />
      )}
      {isPending ? "Cancelling..." : "Cancel Donation"}
    </Button>
  );
}
