import API from "../instance";
import { Response } from "../types";
import { UpdateDonorProfileRequestDto } from "./dto/request/update_donor_profile";
import { GetDonorProfileResponseDTO } from "./dto/response/get_donor_profile.dto";
export const updateDonorProfile = async (
  payload: UpdateDonorProfileRequestDto
) => {
  const { data: response } = await API.put<
    Response<GetDonorProfileResponseDTO>
  >("donor/update", payload);
  return response.data!;
};
