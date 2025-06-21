import API from "../instance";
import { Response } from "../types";
import { VerifyOTPRequestDto } from "./dto/request/verify_OTP.dto";
import { VerifyOTPResponseDto } from "./dto/response/verify_OTP.dto";

export const verifyOTP = async (payload: VerifyOTPRequestDto) => {
  const { data: response } = await API.post<Response<VerifyOTPResponseDto>>(
    "/meal/verify-otp",
    payload
  );
  return response.data!;
};
