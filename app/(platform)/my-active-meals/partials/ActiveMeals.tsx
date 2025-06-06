"use client";
import MealHooks from "@/api/meals/hooks";
import { BackButton } from "@atoms";
import { MealCard } from "@molecules";
import { Skeleton } from "@ui";

export default function ActiveMeals() {
  const { data, isPending, isError } = MealHooks.useGetActiveMeals();
  if (isPending)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {Array.from({ length: 4 }, (_, i) => {
          return (
            <Skeleton
              key={i}
              className="w-full max-w-xs mx-auto h-80 rounded-2xl"
            />
          );
        })}
      </div>
    );
  if (isError) return <div>Something went wrong.</div>;
  return (
    <>
      <BackButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
        {data?.map((meal, idx) => (
          <MealCard key={idx} meal={meal} />
        ))}
      </div>
    </>
  );
}
