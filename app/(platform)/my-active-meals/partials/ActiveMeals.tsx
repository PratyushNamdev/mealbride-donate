"use client";
import MealHooks from "@MealHooks";
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

  if (isError || !data) {
    throw new Error("Error fetching active meals");
  }

  if (data.length === 0) {
    return <NoMealFound />;
  }

  return (
    <div className="grid gap-6 px-4 py-8 max-w-[1300px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((meal, idx) => (
        <MealCard key={idx} meal={meal} endpoint="/my-active-meals" />
      ))}
    </div>
  );
}
