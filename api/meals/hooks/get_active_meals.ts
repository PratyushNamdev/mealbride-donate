import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import MealsAPI from "..";
import { GetActiveMealsResponseDto } from "../dto/response/get_active_meal.dto";

export const useGetActiveMeals = (
  options?: UseQueryOptions<GetActiveMealsResponseDto, Error>
) => {
  return useQuery({
    queryKey: ["get-active-meal"],
    queryFn: MealsAPI.getActiveMeals,
    ...options,
  });
};
