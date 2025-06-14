import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import DonorAPI from "..";
import { UpdateDonorProfileRequestDto } from "../dto/request/update_donor_profile";
import { GetDonorProfileResponseDTO } from "../dto/response/get_donor_profile.dto";
export const useUpdateDonorProfile = (
  options?: UseMutationOptions<
    GetDonorProfileResponseDTO,
    Error,
    UpdateDonorProfileRequestDto
  >
) => {
  return useMutation({
    mutationFn: DonorAPI.updateDonorProfile,
    ...options,
  });
};
