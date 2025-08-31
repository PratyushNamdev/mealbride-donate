import { useQuery } from "@tanstack/react-query";
import MealsAPI from "..";
import { GetMealHistoryDetailsRequestDto } from "../dto/request/get_meal_history_details.dto";

export const useGetMealHistoryDetails = (
  request: GetMealHistoryDetailsRequestDto
) => {
  return useQuery({
    queryKey: ["get-meal-history-detail", request.mealId],
    queryFn: () => MealsAPI.getMealHistoryDetails(request),
  });
};
