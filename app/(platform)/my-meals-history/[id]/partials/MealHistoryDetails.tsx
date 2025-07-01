"use client";
import MealHooks from "@MealHooks";
import { CollectorInfo, MealDescription, NoMealFound } from "@molecules";
import { Skeleton } from "@ui";
import { useRouter } from "next/navigation";
export default function MealHistoryDetails({ mealId }: { mealId: string }) {
  const router = useRouter();
  const { data, isLoading, isError, error } =
    MealHooks.useGetMealHistoryDetails({
      mealId,
    });

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="max-w-2xl m-4 flex flex-col items-center w-full">
          <Skeleton className="w-full h-100 bg-gray-100" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
            <Skeleton className="h-60 bg-gray-100" />
            <Skeleton className="h-60 bg-gray-100" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-15 mt-2 w-full">
            <Skeleton className="h-10 w-full bg-gray-100" />
            <Skeleton className="h-10 w-full bg-gray-100" />
          </div>
        </div>
      </div>
    );

  if (isError) {
    const customError = error as unknown as { status: number; message: string };

    if (customError.status === 409) {
      router.push(`/my-active-meals/${mealId}`);
      return null;
    }
    throw new Error("Cannot load the meal.");
  }

  if (!data) return <NoMealFound />;

  return (
    <div className="max-w-2xl mx-2 sm:mx-auto px-2 mb-8">
      <MealDescription meal={data} />
      {data.collector && data.collectorId && (
        <CollectorInfo collector={data.collector} mealId={data._id} />
      )}
    </div>
  );
}
