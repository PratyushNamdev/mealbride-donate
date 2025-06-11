import { useQuery } from "@tanstack/react-query";
import MealsAPI from "..";
import { GetActiveMealDetailRequestDto } from "../dto/request/get_active_meal_detail.dto";

export const useGetActiveMealDetail = (
  request: GetActiveMealDetailRequestDto
) => {
  return useQuery({
      queryKey: ["get-active-meal-detail", request.mealId],
    queryFn: () => MealsAPI.getActiveMealDetail(request),
  });
};
