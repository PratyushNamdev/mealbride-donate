"use client";

import MealHooks from "@/api/meals/hooks";
import { MealBanner } from "@molecules";
import { useRouter } from "next/navigation";

export default function ActiveDonationPreviewBanner() {
  const { data, isPending, isError } = MealHooks.useGetActiveMeals();
  const router = useRouter();

  if (isPending || isError || !data || data.length === 0) return null;

  const handleClick = () => {
    router.push("./my-active-meals");
  };

  return (
    <div className="p-3 flex flex-col sm:flex-row justify-center items-center lg:items-start gap-4">
      <div
        className="w-full max-w-[400px] cursor-pointer"
        onClick={handleClick}
      >
        <MealBanner meal={data[0]} />
      </div>

      {data[1] && (
        <div
          className="hidden lg:block w-full max-w-[400px] cursor-pointer"
          onClick={handleClick}
        >
          <MealBanner meal={data[1]} />
        </div>
      )}

      {data[2] && (
        <div
          className="hidden xl:block w-full max-w-[400px] cursor-pointer"
          onClick={handleClick}
        >
          <MealBanner meal={data[2]} />
        </div>
      )}
    </div>
  );
}
