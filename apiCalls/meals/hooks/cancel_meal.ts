import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import MealsAPI from "..";
import { CancelMealRequestDto } from "../dto/request/cancel_meal.dto";
import { CancelMealResponseDto } from "../dto/response/cancel_meal.dto";

export const useCancelMeal = (
  options?: UseMutationOptions<
    CancelMealResponseDto,
    Error,
    CancelMealRequestDto
  >
) => {
  return useMutation({
    mutationFn: MealsAPI.cancelMeal,
    ...options,
  });
};
