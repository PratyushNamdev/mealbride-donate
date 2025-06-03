import { GetUserProfileResponse } from './dto/response/get_user_profile.dto';
import API from '../instance';
import { Response } from '../types';
import { GetUserProfileRequest } from './dto/request/get_user_profile.dto';

export const getUserProfile = async({id,userType}:GetUserProfileRequest)=> {
  const { data: response } = await API.get<Response<GetUserProfileResponse>>(
    `/user/${id}`,
    {
      headers: {
        'User-Type': userType,
      },
    }
  );
  return response.data;
};
