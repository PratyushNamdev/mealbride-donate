import API from "@/api/instance";
import { Response } from "@/api/types";
import { GetActiveMealDetailsRequestDto } from "./dto/request/get_active_meal_details.dto";
import { GetActiveMealDetailsResponseDto } from "./dto/response/get_active_meal_details.dto";

export const getActiveMealDetails = async (
  payload: GetActiveMealDetailsRequestDto
) => {
  const { data: response } = await API.get<
    Response<GetActiveMealDetailsResponseDto>
  >(`/donor/get-active-meal/${payload.mealId}`);
  return response.data!;
};
