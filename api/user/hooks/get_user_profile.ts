import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetUserProfileResponse } from "../dto/response/get_user_profile.dto";
import UserAPI from "..";
import { GetUserProfileRequest } from "../dto/request/get_user_profile.dto";

export const useGetUserProfile = (
  request: GetUserProfileRequest
) => {
  return useQuery({
    queryKey: ['get-user-profile'],
    queryFn: () => UserAPI.getUserProfile(request),
    enabled: !!request.id && !!request.userType,
  });
};


