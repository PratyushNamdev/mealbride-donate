import API from "@/apiCalls/instance";
import { Response } from "@/apiCalls/types";
import { GetActiveMealsResponseDto } from "./dto/response/get_active_meals.dto";

export const getActiveMeals = async () => {
  const { data: response } = await API.get<Response<GetActiveMealsResponseDto>>(
    "/donor/get-active-meal"
  );
  return response.data!;
};
