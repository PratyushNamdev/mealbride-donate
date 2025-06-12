import { BackButton } from "@atoms";
import { MealsHistory } from "./partials";
export default function MyMealsHistory() {
  return (
    <>
      <BackButton className="sm:mb-2 m-4" />
      <MealsHistory />
    </>
  );
}
