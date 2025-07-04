"use client";
import MealHooks from "@MealHooks";
import { CollectorInfo, MealDescription, NoMealFound } from "@molecules";
import CancelBooking from "./Buttons/CancelBooking";
import CancelDonation from "./Buttons/CancelDonation";
import { Skeleton } from "@ui";
import { useRouter } from "next/navigation";
import SuccessDialog from "./SuccessDialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ActiveMealDetails({ mealId }: { mealId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showSuccessPopUp, setShowSuccessPopup] = useState(false);

  const onGoHome = () => {
    router.replace("/");
    console.log("invalidating data in home");
    queryClient.invalidateQueries({
      queryKey: ["get-active-meal-detail", mealId],
    });
    setShowSuccessPopup(false);
  };

  const onViewHistory = () => {
    router.replace("/my-meals-history");
    queryClient.invalidateQueries({
      queryKey: ["get-active-meal-detail", mealId],
    });
    setShowSuccessPopup(false);
    console.log("invalidating data in history");
  };

  const onClose = () => {
    onGoHome();
    setShowSuccessPopup(false);
  };

  const { data, isPending, isError, error } = MealHooks.useGetActiveMealDetails(
    {
      mealId,
    }
  );

  if (isPending)
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
      router.push(`/my-meals-history/${mealId}`);
      return null;
    }
    if (error.message) {
      throw new Error("Cannot load the Meal.");
    }
  }

  if (!data) return <NoMealFound />;

  const isActive = Date.now() < new Date(data.expiryDate).getTime();

  return (
    <div className="max-w-2xl mx-2 sm:mx-auto px-2">
      <SuccessDialog
        open={showSuccessPopUp}
        onClose={onClose}
        onGoHome={onGoHome}
        onViewHistory={onViewHistory}
      />
      <MealDescription meal={data} />
      {data.collector && data.collectorId && (
        <CollectorInfo
          collector={data.collector}
          mealId={data._id}
          showOTPDrawer={true}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
      {isActive && (
        <div className="flex flex-col sm:flex-row gap-3 mb-15 mt-2">
          <CancelDonation mealId={mealId} />
          <CancelBooking mealId={mealId} booked={!!data.collectorId} />
        </div>
      )}
    </div>
  );
}
