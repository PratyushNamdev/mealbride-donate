import API from "../instance";
import { Response } from "../types";
import { UpdateDonorAddressRequestDto } from "./dto/request/update_donor_address.dto";
import { UpdateDonorAddressResponseDto } from "./dto/response/update_donor_address.dto";

export const updateDonorAddress = async (
  payload: UpdateDonorAddressRequestDto
) => {
  const { data: response } = await API.put<
    Response<UpdateDonorAddressResponseDto>
  >("donor/address", payload);
  return response.data!;
};
