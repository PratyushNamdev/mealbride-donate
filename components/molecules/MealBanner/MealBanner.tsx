import Image from "next/image";
import { GetActiveMealDto } from "@/api/meals/dto/response/get_active_meals.dto";
import { Users } from "lucide-react";
import { StatusBadge, VegBadge } from "@atoms";

export default function MealBanner({ meal }: { meal: GetActiveMealDto }) {
  return (
    <div className="flex items-start w-full gap-3 rounded-xl border border-[#005e38] bg-[#f3fef9] shadow-md hover:shadow-lg transition-shadow p-3">
      {/*  Image Section */}
      <div className="shrink-0 w-12 h-12">
        <Image
          src={meal.image}
          alt="Food Image"
          width={48}
          height={48}
          className="w-full h-full rounded-full border border-[#005e38] object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex mt-1 justify-between w-full items-center gap-2">
        <div className="flex flex-col items-start text-sm gap-1">
          <p className="text-sm font-semibold text-[#083b2c] truncate max-w-[150px] md:max-w-[200px]">
            {meal.foodDesc}
          </p>
          <StatusBadge status={meal.status}/>
        </div>

        {/* Meta Info */}
        <div className="flex flex-col items-end text-sm gap-1">
          <p className="text-[#4a7765] flex gap-1 pr-1">
            <Users className="h-4 w-4" />
            <span className="font-semibold text-[#083b2c]">
              {meal.feedsUpto}
            </span>
            <span className="font-md">plates</span>
          </p>
          <VegBadge isVeg={meal.veg}/>
        </div>
      </div>
    </div>
  );
}
