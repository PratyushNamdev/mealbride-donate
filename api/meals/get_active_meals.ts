import API from "@/api/instance";
import { Response } from "@/api/types";
import { GetActiveMealsResponseDto } from "./dto/response/get_active_meal.dto";

export const getActiveMeals = async () => {
  const { data: response } = await API.get<Response<GetActiveMealsResponseDto>>(
    "/donor/get-active-meal"
  );
  return response.data!;
};
