"use client";
import MealHooks from "@MealHooks";
import { MealCard, NoMealFound } from "@molecules";
import { Skeleton } from "@ui";

export default function MealsHistory() {
  const { data, isPending, isError } = MealHooks.useGetMealHistory();

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

  if (isError || !data) {
    throw new Error("Cannot load Meal History.");
  }

  if (data.length === 0) {
    return <NoMealFound />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-8 max-w-[1300px] mx-auto">
      {data?.map((meal, idx) => (
        <div
          key={idx}
          className="w-full sm:w-[48%] md:w-[30%] flex justify-center"
        >
          <MealCard meal={meal} endpoint="my-meals-history" />
        </div>
      ))}
    </div>
  );
}
