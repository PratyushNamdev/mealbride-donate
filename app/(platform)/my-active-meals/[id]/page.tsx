import { BackButton } from "@atoms";
import ActiveMealDetail from "./partials/ActiveMealDetail";

export default async function MyActiveMealDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <BackButton />
      <ActiveMealDetail mealId={id} />
    </>
  );
}
