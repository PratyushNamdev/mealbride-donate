import { GetActiveMealDto } from "@/api/meals/dto/response/get_active_meal.dto";
import { cn } from "@/lib/utils";
import { GetDetails } from "@atoms";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MealCard({ meal }: { meal: GetActiveMealDto }) {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl shadow-md 
                 hover:shadow-lg transition-shadow duration-200 overflow-hidden 
                 w-full max-w-xs mx-auto"
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

      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span
            className={cn(
              "text-xs font-semibold uppercase px-3 py-1 rounded-full",
              meal.status === "available"
                ? "bg-green-50 text-green-800"
                : "bg-yellow-50 text-yellow-800"
            )}
          >
            {meal.status === "available" ? "Available" : "Reserved"}
          </span>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-4 h-4 rounded-full border-2",
                meal.veg
                  ? "bg-green-600 border-green-700"
                  : "bg-red-500 border-red-600"
              )}
            />
            <span className="text-xs font-medium text-gray-700">
              {meal.veg ? "Veg" : "Non-Veg"}
            </span>
          </div>
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
              {meal.foodDesc.slice(0, 30)}...
              <Link href={`/`} className="text-[#00734a] font-semibold">
                {" "}
                view more
              </Link>
            </>
          ) : (
            <>{meal.foodDesc}</>
          )}
        </p>
        <div>
          <GetDetails />
        </div>
      </div>
    </div>
  );
}
