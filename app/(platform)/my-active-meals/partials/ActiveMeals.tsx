"use client";
import MealHooks from "@/api/meals/hooks";
import { MealCard, NoMealFound } from "@molecules";
import { Skeleton } from "@ui";

export default function ActiveMeals() {
  const { data, isPending, isError } = MealHooks.useGetActiveMeals();

  if (isPending) {
    return (
      <div className="flex flex-wrap justify-center gap-6 px-4 py-8 max-w-[1300px] mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full sm:w-[48%] md:w-[30%] flex justify-center"
          >
            <Skeleton className="w-full max-w-[360px] h-80 rounded-2xl bg-gray-100" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-10 font-medium">
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <NoMealFound />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-8 max-w-[1300px] mx-auto">
      {data?.map((meal, idx) => (
        <div
          key={idx}
          className="w-full sm:w-[48%] md:w-[30%] flex justify-center"
        >
          <MealCard meal={meal} />
        </div>
      ))}
    </div>
  );
}
