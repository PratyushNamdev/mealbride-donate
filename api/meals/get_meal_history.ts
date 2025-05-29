import API from "@/api/instance";
import { Response } from "@/api/types";
import { GetMealHistoryResponseDto } from "./dto/response/get_meal_history.dto";

export const getMealHistory = async () => {
  const { data: response } = await API.get<Response<GetMealHistoryResponseDto>>(
    "/donor/get-meal-history"
  );
  return response.data!;
};
