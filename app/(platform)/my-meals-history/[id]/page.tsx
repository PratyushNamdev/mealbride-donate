import { BackButton } from "@atoms";
import { MealHistoryDetails } from "./partials";

export default async function MyMealHistoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <BackButton className="sm:mb-2 m-4" />
      <MealHistoryDetails mealId={id}/>
    </>
  );
}
