import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import MealsAPI from "..";
import { DiscardMealBookingRequestDto } from "../dto/request/discard_meal_booking.dto";
import { DiscardMealBookingResponseDto } from "../dto/response/discard_meal_booking.dto";

export const useDiscardMealBooking = (
  options?: UseMutationOptions<
    DiscardMealBookingResponseDto,
    Error,
    DiscardMealBookingRequestDto
  >
) => {
  return useMutation({
    mutationFn: MealsAPI.discardMealBooking,
    ...options,
  });
};
