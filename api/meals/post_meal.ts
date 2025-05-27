import API from "@/api/instance";
import { Response } from "@/api/types";
import { PostMealRequestDto } from "./dto/request/post_meal.dto";
import { PostMealResponseDto } from "./dto/response/post_meal.dto";

export const postMeal = async (payload: PostMealRequestDto) => {
  const { data: response } = await API.post<Response<PostMealResponseDto>>(
    "/donor/post-meal",
    payload
  );
  return response.data!;
};
