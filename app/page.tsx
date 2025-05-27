"use client";

import { Button } from "@/components/ui/button";
import { usePostMeal } from "@/api/meals/hooks/post-meal";

export default function Home() {
  const { mutate, isPending, isSuccess, isError, error } = usePostMeal({
    onSuccess: (data) => {
      console.log("da", data);
    },
  });

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
      preferredTime: new Date("2025-05-28T14:00:00Z"),
      expiryDate: new Date("2025-05-28T18:00:00Z"),
    });
  };

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
        <p className="text-red-600">
          Error: {error?.message || "Failed to post"}
        </p>
      )}
    </div>
  );
}
