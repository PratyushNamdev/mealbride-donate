import { toast } from "sonner";
import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";

export interface MealExpiredEventPayload {
  mealId: string;
  message: string;
  foodDesc?: string;
  image?: string;
}

export default function handleMealExpired(
  data: MealExpiredEventPayload,
  queryClient: QueryClient
): Notification {
  toast.error(data.message || "Meal expired");

  queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
  queryClient.invalidateQueries({ queryKey: ["get-meal-history"] });

  return {
    id: Date.now().toString(),
    title: "Meal Expired",
    message: data.message || "Your listed meal has expired.",
    link: `/my-meals-history/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_expired",
  };
}
