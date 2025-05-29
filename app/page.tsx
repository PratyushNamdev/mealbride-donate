"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import MealHooks from "@/api/meals/hooks";

export default function Home() {
  const {
    useCancelMeal,
    useDiscardMealBooking,
    useGetActiveMeals,
    useGetMealHistory,
    usePostMeal,
  } = MealHooks;

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, error } = usePostMeal({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
    },
  });
  const { data, isLoading, error: getActiveMealsError } = useGetActiveMeals();
  const { data: mealHistory, isLoading: isMealHistoryLoading } =
    useGetMealHistory();

  const { mutate: cancelMeal, isPending: isCancelLoading } = useCancelMeal({
    onSuccess: (data) => {
      console.log("Meal cancelled:", data);
      queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
      queryClient.invalidateQueries({ queryKey: ["get-meal-history"] });
    },
  });

  const { mutate: discardBooking, isPending: isDiscardMealBookingLoading } =
    useDiscardMealBooking({
      onSuccess: (data) => {
        console.log("Booking discarded:", data);
        // Optionally invalidate or refetch queries here
      },
      onError: (error) => {
        console.error("Error discarding meal booking:", error);
      },
    });

  const handleDiscardMealBooking = (mealId: string) => {
    discardBooking({ mealId });
  };

  const handleCancelMeal = (mealId: string) => {
    cancelMeal({ mealId });
  };

  const handlePostMeal = () => {
    mutate({
      image:
        "https://knowledge.hubspot.com/hubfs/how-to-make-picture-into-link-3-20241023-1921236.webp", // Base64 or Cloudinary image URL
      foodDesc: "10 plates of biryani",
      veg: false,
      feedsUpto: 10,
      address: "Sector 21, Dwarka",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      postalCode: 110077,
      preferredTime: new Date("2025-06-01T14:00:00Z"),
      expiryDate: new Date("2025-06-10T18:00:00Z"),
    });
  };
  if (isLoading)
    return <div className="text-center py-10">Loading meals...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-10">Error loading meals</div>
    );

  return (
    <div className="p-4 space-y-2">
      <Button
        variant="default"
        size="lg"
        onClick={handlePostMeal}
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Donate Meal"}
      </Button>

      {isSuccess && <p className="text-green-600">Meal posted successfully!</p>}
      {isError && (
        <p className="text-red-600">Error: {error || "Failed to post"}</p>
      )}

      {data && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Active Meals</h1>
          {data.length === 0 ? (
            <div className="text-center text-gray-500">
              No active meals available
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((meal) => (
                <div
                  key={meal._id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden border"
                >
                  <img
                    src={meal.image}
                    alt="Meal"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {meal.foodDesc}
                    </h2>
                    <p className="text-gray-600 mb-1">
                      Feeds: {meal.feedsUpto}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Location: {meal.address}, {meal.city}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Veg: {meal.veg ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Preferred Time:{" "}
                      {new Date(meal.preferredTime).toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Expiry: {new Date(meal.expiryDate).toLocaleString()}
                    </p>
                    <Button
                      className="mt-4 cursor-pointer"
                      variant={"destructive"}
                      onClick={() => handleCancelMeal(meal._id.toString())}
                      disabled={isCancelLoading}
                    >
                      Cancel Meal
                    </Button>
                    <Button
                      className="mt-4 cursor-pointer"
                      variant={"outline"}
                      onClick={() =>
                        handleDiscardMealBooking(meal._id.toString())
                      }
                      disabled={isDiscardMealBookingLoading}
                    >
                      Discard Current Meal Booking
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {mealHistory && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Meals History</h1>
          {mealHistory.meals.length === 0 ? (
            <div className="text-center text-gray-500">No Meals History</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealHistory.meals.map((meal) => (
                <div
                  key={meal._id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden border"
                >
                  <img
                    src={meal.image}
                    alt="Meal"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 bg-gray-300">
                    <h2 className="text-xl font-semibold mb-2">
                      {meal.foodDesc}
                    </h2>
                    <p className="text-gray-600 mb-1">
                      Feeds: {meal.feedsUpto}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Location: {meal.address}, {meal.city}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Veg: {meal.veg ? "Yes" : "No"}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Status:{" "}
                      <span className="text-red-500"> {meal.status} </span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Preferred Time:{" "}
                      {new Date(meal.preferredTime).toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Expiry: {new Date(meal.expiryDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
