import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { VerifyOtpRequestDto } from "../dto/request/verify_otp.dto";
import { VerifyOtpResponseDto } from "../dto/response/verify_otp.dto";
import OtpAPI from "..";

export const useVerifyOtp = (
  options?: UseMutationOptions<VerifyOtpResponseDto, Error, VerifyOtpRequestDto>
) => {
  return useMutation({
    mutationFn: OtpAPI.verifyOtp,
    ...options,
  });
};
