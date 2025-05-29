import API from "../instance";
import { Response } from "../types";
import { CancelMealRequestDto } from "./dto/request/cancel_meal.dto";
import { CancelMealResponseDto } from "./dto/response/cancel_meal.dto";

export const cancelMeal = async (payload: CancelMealRequestDto) => {
  const { data: response } = await API.put<Response<CancelMealResponseDto>>(
    "/donor/cancel-meal",
    payload
  );
  return response.data!;
};
