import { GetDonorProfileResponseDTO } from "@/api/donor/dto/response/get_donor_profile.dto";
import { cookies } from "next/headers";
import { Response } from "@/api/types";
export async function getDonorProfileServer() {
  const cookieStore = cookies();
  const donorId = (await cookieStore).get("donor_id")?.value;

  if (!donorId) return null;

  const res = await fetch(`http://localhost:3001/donor/${donorId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const response: Response<GetDonorProfileResponseDTO> = await res.json();
  return response.data!;
}
