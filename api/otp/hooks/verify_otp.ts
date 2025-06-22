import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { VerifyOTPRequestDto } from "../dto/request/verify_OTP.dto";
import { VerifyOTPResponseDto } from "../dto/response/verify_OTP.dto";
import OTP_API from "..";

export const useVerifyOTP = (
  options?: UseMutationOptions<VerifyOTPResponseDto, Error, VerifyOTPRequestDto>
) => {
  return useMutation({
    mutationFn: OTP_API.verifyOTP,
    ...options,
  });
};
