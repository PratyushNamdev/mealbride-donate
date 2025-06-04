import API from "../instance";
import { Response } from "../types";
import { GetUserProfileRequestDto } from "./dto/request/get_user_profile.dto";
import { GetUserProfileResponseDto } from "./dto/response/get_user_profile.dto";

export const getUserProfile = async (payload: GetUserProfileRequestDto) => {
  const { data: response } = await API.get<Response<GetUserProfileResponseDto>>(
    `/user/${payload.id}`,
    {
      headers: {
        "User-Type": payload.userType,
      },
    }
  );
  return response.data;
};
