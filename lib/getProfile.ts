import { cookies } from "next/headers";

export async function getDonorProfileServer() {
  const cookieStore = cookies();
  const donorId = (await cookieStore).get("donor_id")?.value;

  if (!donorId) return null;

  const res = await fetch(`http://localhost:3001/donor/${donorId}`, {
    cache: "no-store",
  });
  
  if (!res.ok) return null;

  return await res.json();
}
