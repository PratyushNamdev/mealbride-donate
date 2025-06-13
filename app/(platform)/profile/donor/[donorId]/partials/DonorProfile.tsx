"use client";

import { Card, CardContent, CardHeader, CardTitle, Button } from "@ui";
import Image from "next/image";
import DonorHooks from "@DonorHooks";
import { useEffect, useState } from "react";
import { PencilIcon } from "lucide-react";
import { AddressCard, AddressFormDialog } from "@molecules";

export default function DonorProfile({ donorId }: { donorId: string }) {
  const { data, isPending } = DonorHooks.useGetDonorProfile(donorId);
  const [userId, setUserId] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  useEffect(() => {
    const id = localStorage.getItem("donor_id");
    setUserId(id);
  }, []);

  if (isPending || !data) return <div>Loading</div>;

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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-green-700">
            Donor Profile
          </CardTitle>
          {userId === donorId && (
            <Button variant="outline" className="text-sm cursor-pointer">
              <PencilIcon className="mr-1 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src={profilePicture}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold">{username}</div>
              <div className="text-xs sm:text-sm text-gray-500">{email}</div>
            </div>
          </div>

          <div className="flex sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="text-sm text-gray-500">Donations Made</div>
              <div className="font-medium">{donationCount}</div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">Joined On</div>
              <div className="font-medium">
                {new Date(createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">Contact Number</div>
              <div className="font-medium">{contact || "Not Provided"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
