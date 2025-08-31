import API from "../instance";
import { Response } from "../types";
import { DiscardMealBookingRequestDto } from "./dto/request/discard_meal_booking.dto";
import { DiscardMealBookingResponseDto } from "./dto/response/discard_meal_booking.dto";

export const discardMealBooking = async (
  payload: DiscardMealBookingRequestDto
) => {
  const { data: response } = await API.put<
    Response<DiscardMealBookingResponseDto>
  >("/donor/discard-meal-request", payload);
  return response.data!;
};
