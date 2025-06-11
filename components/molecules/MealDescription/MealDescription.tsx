import GetActiveMealDetailsResponseDto from "@/api/meals/dto/response/get_active_meal_details.dto";
import MealIntro from "./MealIntro";
import MealInfo from "./MealInfo";

export default function MealDescription({
  meal,
}: {
  meal: GetActiveMealDetailsResponseDto;
}) {
  return (
    <>
      <MealIntro meal={meal} />
      <MealInfo meal={meal} />
    </>
  );
}
