import { useQuery } from "@tanstack/react-query";
import UserAPI from "..";
import { GetUserProfileRequestDto } from "../dto/request/get_user_profile.dto";

export const useGetUserProfile = (request: GetUserProfileRequestDto) => {
  return useQuery({
    queryKey: ["get-user-profile"],
    queryFn: () => UserAPI.getUserProfile(request),
    enabled: !!request.id && !!request.userType,
  });
};
