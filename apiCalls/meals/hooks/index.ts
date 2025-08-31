import { useCancelMeal } from "./cancel_meal";
import { useDiscardMealBooking } from "./discard_meal_booking";
import { useGetActiveMealDetails } from "./get_active_meal_details";
import { useGetActiveMeals } from "./get_active_meals";
import { useGetMealHistory } from "./get_meal_history";
import { useGetMealHistoryDetails } from "./get_meal_history_details";
import { usePostMeal } from "./post-meal";

const MealHooks = {
  useCancelMeal,
  useDiscardMealBooking,
  useGetActiveMeals,
  useGetMealHistory,
  usePostMeal,
  useGetActiveMealDetails,
  useGetMealHistoryDetails,
};

export default MealHooks;
