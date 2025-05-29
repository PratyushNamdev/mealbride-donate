import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import MealsAPI from "..";
import { GetMealHistoryResponseDto } from "../dto/response/get_meal_history.dto";

export const useGetMealHistory = (
  options?: UseQueryOptions<GetMealHistoryResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-meal-history"],
    queryFn: MealsAPI.getMealHistory,
    ...options,
  });
};
