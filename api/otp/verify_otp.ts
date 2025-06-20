import API from "../instance";
import { Response } from "../types";
import { VerifyOtpRequestDto } from "./dto/request/verify_otp.dto";
import { VerifyOtpResponseDto } from "./dto/response/verify_otp.dto";

export const verifyOtp = async (payload: VerifyOtpRequestDto) => {
  const { data: response } = await API.post<Response<VerifyOtpResponseDto>>(
    "/meal/verify-otp",
    payload
  );
  return response.data!;
};
