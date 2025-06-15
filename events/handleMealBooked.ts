import { toast } from "sonner";
import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";

export interface MealBookedEventPayload {
  mealId: string;
  collectorId: string;
  message: string;
  foodDesc: string;
  image: string;
}

export default function handleMealBooked(
  data: MealBookedEventPayload,
  queryClient: QueryClient
): Notification {
  toast.success(data.message || "A meal was booked");

  queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
  queryClient.invalidateQueries({
    queryKey: ["get-active-meal-detail", data.mealId],
  });

  return {
    id: `${Date.now()}_${Math.random().toString(36).slice(2)}`,
    title: "Meal Booked",
    message: data.message || "Someone booked your meal.",
    link: `/my-active-meals/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_booked",
  };
}
