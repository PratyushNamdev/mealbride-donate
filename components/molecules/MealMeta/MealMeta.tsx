import GetActiveMealDetailResponseDto from "@/api/meals/dto/response/get_active_meal_detail.dto";
import MealAddress from "./partials/MealAddress";
import MealTime from "./partials/MealTime";

export default function MealMeta({
  meal,
}: {
  meal: GetActiveMealDetailResponseDto;
}) {
  const mealAddress = {
    city: meal.city,
    state: meal.state,
    country: meal.country,
    address: meal.address,
    postalCode: meal.postalCode,
  };

  const mealTime = {
    preferredTime: meal.preferredTime,
    deliveryDate: meal?.deliveryDate,
    expiryDate: meal.expiryDate,
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      <MealAddress mealAddress={mealAddress} />
      <MealTime mealTime={mealTime} />
    </div>
  );
}
