import { useQuery } from "@tanstack/react-query";
import MealsAPI from "..";
import { GetActiveMealDetailsRequestDto } from "../dto/request/get_active_meal_details.dto";

export const useGetActiveMealDetails = (
  request: GetActiveMealDetailsRequestDto
) => {
  return useQuery({
    queryKey: ["get-active-meal-detail", request.mealId],
    queryFn: () => MealsAPI.getActiveMealDetails(request),
  });
};
