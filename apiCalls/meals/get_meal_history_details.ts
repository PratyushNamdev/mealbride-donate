import API from "@/api/instance";
import { Response } from "@/api/types";
import { GetMealHistoryDetailsRequestDto } from "./dto/request/get_meal_history_details.dto";
import { GetMealHistoryDetailsResponsetDto } from "./dto/response/get_meal_history_details.dto";

export const getMealHistoryDetails = async (
  payload: GetMealHistoryDetailsRequestDto
) => {
  const { data: response } = await API.get<
    Response<GetMealHistoryDetailsResponsetDto>
  >(`/donor/get-meal-history/${payload.mealId}`);

  return response.data!;
};
