import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import MealsAPI from "..";
import { PostMealResponseDto } from "../dto/response/post_meal.dto";
import { PostMealRequestDto } from "../dto/request/post_meal.dto";
export const usePostMeal = (
  options?: UseMutationOptions<PostMealResponseDto, Error, PostMealRequestDto>
) => {
  return useMutation({
    mutationFn: MealsAPI.postMeal,
    ...options,
  });
};
