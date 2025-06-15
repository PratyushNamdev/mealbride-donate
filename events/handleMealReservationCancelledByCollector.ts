import { toast } from "sonner";
import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";

export interface MealReservationCancelledByCollectorPayload {
  mealId: string;
  collectorId: string;
  collectorName: string;
  message: string;
  foodDesc: string;
  image: string;
}

export default function handleMealReservationCancelledByCollector(
  data: MealReservationCancelledByCollectorPayload,
  queryClient: QueryClient
): Notification {
  toast.warning(data.message || "A meal reservation was cancelled.");

  queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
  queryClient.invalidateQueries({
    queryKey: ["get-active-meal-detail", data.mealId],
  });

  return {
    id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
    title: "Reservation Cancelled",
    message:
      data.message || `${data.collectorName} cancelled their reservation.`,
    link: `/my-active-meals/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_reservation_cancelled_by_collector",
  };
}
