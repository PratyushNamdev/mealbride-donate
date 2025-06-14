"use client";

import DonorHooks from "@DonorHooks";
import { useEffect, useState } from "react";
import { AddressCard, AddressFormDialog } from "@molecules";
import ProfileFormDialog from "./ProfileFormDialog";
import DonorProfileCard from "./DonorProfileCard";
import DonorProfileSkeleton from "./DonorProfileSkeleton";

export default function DonorProfile({ donorId }: { donorId: string }) {
  const { data, isPending, isError } = DonorHooks.useGetDonorProfile(donorId);
  const [userId, setUserId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  useEffect(() => {
    const id = localStorage.getItem("donor_id");
    setUserId(id);
  }, []);

  if (isPending) return <DonorProfileSkeleton />;
  if (isError || !data) {
    throw new Error("Donor profile fetch failed");
  }

  const {
    username,
    profilePicture,
    email,
    donationCount,
    createdAt,
    address,
    contact,
  } = data;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <DonorProfileCard
        userId={userId}
        donorId={donorId}
        username={username}
        profilePicture={profilePicture}
        email={email}
        donationCount={donationCount}
        createdAt={createdAt}
        contact={contact}
        onEdit={() => setEditProfile(true)}
      />

      <ProfileFormDialog
        open={editProfile}
        setOpen={setEditProfile}
        username={username}
        contact={contact}
      />
      {address && (
        <>
          <AddressCard
            mealAddress={address}
            isEditable={userId === donorId}
            onEdit={() => setEditAddress(true)}
          />
          <AddressFormDialog open={editAddress} setOpen={setEditAddress} />
        </>
      )}
    </div>
  );
}
