import { BackButton } from "@atoms";
import { DonorProfile } from "./partials";
export default async function DonorProfilePage({
  params,
}: {
  params: { donorId: string };
}) {
  const { donorId } = await params;
  return (
    <>
      <BackButton className="sm:ml-4"/>
      <DonorProfile donorId={donorId} />
    </>
  );
}
