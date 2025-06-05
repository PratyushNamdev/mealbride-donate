import Image from "next/image";
import { cn } from "@/lib/utils";
import { GetActiveMealDto } from "@/api/meals/dto/response/get_active_meal.dto";

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
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#083b2c] truncate max-w-[150px] md:max-w-[200px]">
            {meal.foodDesc}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs">
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                meal.status === "available" ? "bg-green-600" : "bg-yellow-400"
              )}
            />
            <span className="text-[#4a7765]">
              {meal.status === "available" ? "Available" : "Reserved"}
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="text-right text-xs whitespace-nowrap">
          <p className="text-[#4a7765]">
            Feeds{" "}
            <span className="font-semibold text-[#083b2c]">
              {meal.feedsUpto}
            </span>
          </p>
          <p
            className={cn(
              "mt-1 font-medium",
              meal.veg ? "text-[#057a55]" : "text-[#dc2626]"
            )}
          >
            {meal.veg ? "✅ Veg" : "🔴 Non-Veg"}
          </p>
        </div>
      </div>
    </div>
  );
}
