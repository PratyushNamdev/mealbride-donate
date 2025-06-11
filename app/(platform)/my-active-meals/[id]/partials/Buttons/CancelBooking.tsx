import MealHooks from "@/api/meals/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui";
import { Ban } from "lucide-react";
import { toast } from "sonner";

export default function CancelBooking({
  mealId,
  booked,
}: {
  mealId: string;
  booked: boolean;
}) {
  const queryClient = useQueryClient();
  const {
    mutate: cancelBooking,
    isPending,
    isError,
  } = MealHooks.useDiscardMealBooking({
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["get-active-meal-detail"] });
      queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
    },
    onError: (error) => {
      console.error("Error cancelling donation:", error);
      toast.error("Failed to cancel donation. Please try again.");
    },
  });

  const handleCancelBooking = () => {
    cancelBooking({ mealId });
  };
  return (
    <Button
      variant="outline"
      className="flex-1 border-red-200 text-red-700 hover:bg-red-50 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={handleCancelBooking}
      disabled={isPending || !booked}
    >
      <Ban className="h-4 w-4 mr-2" />
      Cancel Booking
    </Button>
  );
}
