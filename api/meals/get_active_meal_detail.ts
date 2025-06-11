import API from "@/api/instance";
import { Response } from "@/api/types";
import GetActiveMealDetailResponseDto from "./dto/response/get_active_meal_detail.dto";
import { GetActiveMealDetailRequestDto } from "./dto/request/get_active_meal_detail.dto";

export const getActiveMealDetail = async (
  payload: GetActiveMealDetailRequestDto
) => {
  const { data: response } = await API.get<
    Response<GetActiveMealDetailResponseDto>
  >(`/donor/get-active-meal/${payload.mealId}`);
  return response.data!;
};
