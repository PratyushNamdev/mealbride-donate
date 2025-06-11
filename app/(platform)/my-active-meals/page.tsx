import { BackButton } from "@atoms";
import { ActiveMeals } from "./partials";

export default function MyActiveMeals() {
  return (
    <>
      <BackButton className="sm:mb-2 m-4" />
      <ActiveMeals />
    </>
  );
}
