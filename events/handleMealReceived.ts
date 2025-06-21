import { toast } from "sonner";
import { Notification } from "@/providers/notification_provider";
import { QueryClient } from "@tanstack/react-query";

export interface MealReceivedEventPayload {
  mealId: string;
  collectorId: string;
  collectorName: string;
  message: string;
  foodDesc?: string;
  image?: string;
}

export default function handleMealReceived(
  data: MealReceivedEventPayload,
  queryClient: QueryClient
): Notification {
  toast.success(data.message || "Meal successfully received");

  return {
    id: Date.now().toString(),
    title: "Meal Received",
    message: data.message || `${data.collectorName} has received your meal.`,
    link: `/my-meals-history/${data.mealId}`,
    image: data.image,
    foodDesc: data.foodDesc,
    type: "meal_received",
  };
}
