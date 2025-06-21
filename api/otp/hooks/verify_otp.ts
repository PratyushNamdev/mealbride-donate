import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { VerifyOTPRequestDto } from "../dto/request/verify_OTP.dto";
import { VerifyOTPResponseDto } from "../dto/response/verify_OTP.dto";
import OTPAPI from "..";

export const useVerifyOTP = (
  options?: UseMutationOptions<VerifyOTPResponseDto, Error, VerifyOTPRequestDto>
) => {
  return useMutation({
    mutationFn: OTPAPI.verifyOTP,
    ...options,
  });
};
