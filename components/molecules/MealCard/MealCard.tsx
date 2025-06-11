import { GetActiveMealDto } from "@/api/meals/dto/response/get_active_meals.dto";
import { GetDetails, StatusBadge, VegBadge } from "@atoms";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MealCard({ meal }: { meal: GetActiveMealDto }) {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl shadow-md 
             hover:shadow-lg transition-shadow duration-200 overflow-hidden 
             w-full max-w-[360px] mx-auto flex flex-col min-h-[420px]"
    >
      <div className="w-full h-52 overflow-hidden">
        <Image
          src={meal.image}
          alt="Food image"
          width={400}
          height={300}
          className="w-full h-full object-cover transform transition-transform 
                 duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          <StatusBadge status={meal.status} />
          <VegBadge isVeg={meal.veg} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users className="w-5 h-5 text-gray-600" />
          <span>
            <span className="font-medium">{meal.feedsUpto}</span>{" "}
            {meal.feedsUpto === 1 ? "plate" : "plates"}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {meal.foodDesc.length > 30 ? (
            <>
              {meal.foodDesc.slice(0, 50)}...
              <Link
                href={`/my-active-meals/${meal._id}`}
                className="text-[#00734a] font-semibold"
              >
                {" "}
                view more
              </Link>
            </>
          ) : (
            <>{meal.foodDesc}</>
          )}
        </p>

        <div className="mt-auto">
          <GetDetails id={meal._id} />
        </div>
      </div>
    </div>
  );
}
