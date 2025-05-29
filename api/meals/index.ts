import { cancelMeal } from "./cancel_meal";
import { discardMealBooking } from "./discard_meal_booking";
import { getActiveMeals } from "./get_active_meals";
import { getMealHistory } from "./get_meal_history";
import { postMeal } from "./post_meal";

const MealsAPI = {
  cancelMeal,
  discardMealBooking,
  getActiveMeals,
  getMealHistory,
  postMeal,
};

export default MealsAPI;
