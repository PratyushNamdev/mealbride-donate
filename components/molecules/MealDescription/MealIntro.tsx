import { GetActiveMealDetailsResponseDto } from "@/api/meals/dto/response/get_active_meal_details.dto";
import { Card, CardContent } from "@ui";
import { Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge, VegBadge } from "@atoms";
export default function MealIntro({
  meal,
}: {
  meal: GetActiveMealDetailsResponseDto;
}) {
  return (
    <Card className="my-2">
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.foodDesc}
          className="w-full h-84 sm:h-90 object-cover object-center "
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <VegBadge isVeg={meal.veg} />
          <StatusBadge status={meal.status} />
        </div>
      </div>
      <CardContent>
        <p className="my-2 text-[#005e38] font-semibold text-lg">
          {meal.foodDesc}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-gray-600">
            <Users className="h-4 w-4 text-[#005e38]" />
            <strong>{meal.feedsUpto}</strong>
            plates
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Calendar className="h-4 w-4 text-[#005e38]" />
            <strong>Posted On:</strong>
            {format(new Date(meal.createdAt), "MMM dd, yyyy")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
