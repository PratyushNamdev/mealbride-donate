"use client";

import { Card, CardContent, CardHeader, CardTitle, Button } from "@ui";
import Image from "next/image";
import { PencilIcon, User } from "lucide-react";

interface DonorProfileCardProps {
  userId: string | null;
  donorId: string;
  username: string;
  profilePicture: string;
  email: string;
  donationCount: number;
  createdAt: string;
  contact: string | null;
  onEdit: () => void;
}

export default function DonorProfileCard({
  userId,
  donorId,
  username,
  profilePicture,
  email,
  donationCount,
  createdAt,
  contact,
  onEdit,
}: DonorProfileCardProps) {
  return (
    <Card className="border border-green-200 shadow-lg rounded-xl bg-white">
      <CardHeader className="flex items-center justify-between px-4 py-1">
        <CardTitle className="text-xl font-bold text-[#005e38] tracking-wide flex items-center gap-2 leading-tight">
          <User className="h-5 w-5" />
          Donor Profile
        </CardTitle>

        {userId === donorId && (
          <Button
            variant="outline"
            className="text-sm flex items-center justify-center gap-1 px-2 border-green-600 text-green-700 hover:bg-green-100 cursor-pointer"
            onClick={onEdit}
          >
            <PencilIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Edit Profile</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6 px-5 pb-4">
        <div className="flex items-center gap-4">
          <Image
            src={profilePicture}
            alt="Profile"
            width={64}
            height={64}
            className="rounded-full object-cover border border-green-300"
          />
          <div>
            <div className="text-lg font-semibold text-gray-800">
              {username}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 break-words max-w-[220px] sm:max-w-none">
              {email}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "Donations Made", value: donationCount },
            {
              label: "Joined On",
              value: new Date(createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
            { label: "Contact Number", value: contact || "Not Provided" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-green-100 shadow-sm rounded-lg p-3 text-center hover:shadow-md transition"
            >
              <div className="text-xs text-gray-500 mb-1 tracking-wide">
                {item.label}
              </div>
              <div className="text-base font-bold text-[#005e38]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
