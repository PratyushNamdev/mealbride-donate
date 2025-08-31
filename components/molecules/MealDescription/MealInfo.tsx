import { GetActiveMealDetailsResponseDto } from "@/apiCalls/meals/dto/response/get_active_meal_details.dto";
import MealTime from "./MealTime";
import { AddressCard } from "@molecules";
export default function MealInfo({
  meal,
}: {
  meal: GetActiveMealDetailsResponseDto;
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
      {/* <MealAddress mealAddress={mealAddress} /> */}
      <AddressCard mealAddress={mealAddress} />
      <MealTime mealTime={mealTime} />
    </div>
  );
}
