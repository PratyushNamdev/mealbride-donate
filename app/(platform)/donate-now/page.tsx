import { DonateNowForm } from "./partials";
import { getDonorProfileServer } from "@lib";
import type { GetDonorProfileResponseDTO } from "@/apiCalls/donor/dto/response/get_donor_profile.dto";

export default async function DonateNow() {
  const profile: GetDonorProfileResponseDTO | null =
    await getDonorProfileServer();
  return <DonateNowForm profile={profile} />;
}
