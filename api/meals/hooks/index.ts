import { useCancelMeal } from "./cancel_meal";
import { useDiscardMealBooking } from "./discard_meal_booking";
import { useGetActiveMealDetail } from "./get_active_meal_detail";
import { useGetActiveMeals } from "./get_active_meals";
import { useGetMealHistory } from "./get_meal_history";
import { usePostMeal } from "./post-meal";

const MealHooks = {
  useCancelMeal,
  useDiscardMealBooking,
  useGetActiveMeals,
  useGetMealHistory,
  usePostMeal,
  useGetActiveMealDetail,
};

export default MealHooks;
