import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import DonorAPI from "..";
import { UpdateDonorAddressRequestDto } from "../dto/request/update_donor_address.dto";
import { UpdateDonorAddressResponseDto } from "../dto/response/update_donor_address.dto";

export const useUpdateDonorAddress = (
  options?: UseMutationOptions<
    UpdateDonorAddressResponseDto,
    Error,
    UpdateDonorAddressRequestDto
  >
) => {
  return useMutation({
    mutationFn: DonorAPI.updateDonorAddress,
    ...options,
  });
};
