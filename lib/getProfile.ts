import { GetDonorProfileResponseDTO } from "@/apiCalls/donor/dto/response/get_donor_profile.dto";
import { cookies } from "next/headers";
import { Response } from "@/apiCalls/types";
export async function getDonorProfileServer() {
  const cookieStore = cookies();
  const donorId = (await cookieStore).get("donor_id")?.value;

  if (!donorId) return null;

  let baseURL = "http://localhost:3001";
  if (process.env.NEXT_PUBLIC_ENV === "production") {
    baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  }

  const res = await fetch(`${baseURL}/donor/${donorId}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  const response: Response<GetDonorProfileResponseDTO> = await res.json();
  return response.data!;
}
