import { BackButton } from "@atoms";
import ActiveMealDetails from "./partials/ActiveMealDetails";

export default async function MyActiveMealDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <BackButton className="sm:mb-2 m-4" />
      <ActiveMealDetails mealId={id} />
    </>
  );
}
