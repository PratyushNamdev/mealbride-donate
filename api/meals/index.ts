import { cancelMeal } from "./cancel_meal";
import { discardMealBooking } from "./discard_meal_booking";
import { getActiveMealDetail } from "./get_active_meal_detail";
import { getActiveMeals } from "./get_active_meals";
import { getMealHistory } from "./get_meal_history";
import { postMeal } from "./post_meal";

const MealsAPI = {
  cancelMeal,
  discardMealBooking,
  getActiveMeals,
  getMealHistory,
  postMeal,
  getActiveMealDetail,
};

export default MealsAPI;
