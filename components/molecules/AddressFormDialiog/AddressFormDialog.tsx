"use client";

import { toast } from "sonner";
import { Locate } from "lucide-react";
import {
  Dialog,
  DialogContent,
  Input,
  Button,
  Label,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DonorHooks from "@DonorHooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateDonorAddressRequestDto,
  updateDonorAddressRequestSchema,
} from "@/api/donor/dto/request/update_donor_address.dto";
import axios from "axios";
export default function AddressFormDialog({
  open,
  setOpen,
  showContactField = false,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  showContactField?: boolean;
}) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateDonorAddressRequestDto>({
    mode: "onBlur",
    resolver: zodResolver(updateDonorAddressRequestSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      contact: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const handleUseMyLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    const locationLoadingId = toast.loading("Fetching your location...", {
      description:
        "Please check before submitting, as the data may not be 100% accurate.",
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
              params: {
                key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
                q: `${latitude},${longitude}`,
                pretty: 1,
                no_annotations: 1,
              },
            }
          );

          const details = res.data.results?.[0]?.components || {};
          if (!details) {
            toast.error("Could not retrieve location data.");
            return;
          }
          const formatted = res.data.results?.[0]?.formatted || "";

          reset({
            address: formatted,
            city:
              details.city ||
              details.town ||
              details.village ||
              details.hamlet ||
              details.city_district ||
              details.state_district ||
              details.county ||
              "",

            state: details.state || details.region || "",

            country: details.country || "",

            postalCode: details.postcode || "",
          });
          toast.dismiss(locationLoadingId);
          toast.success("Location auto-filled successfully!");
        } catch (err) {
          toast.dismiss(locationLoadingId);
          toast.error("Failed to fetch address from location.");
          console.error(err);
        }
      },
      () => {
        toast.error("Permission to access location was denied.");
      }
    );
  };

  const { mutate: updateAddress, isPending } = DonorHooks.useUpdateDonorAddress(
    {
      onSuccess: () => {
        toast.success("Address updated successfully");
        queryClient.invalidateQueries({ queryKey: ["get-donor-profile"] });
        setOpen(false);
        reset({
          address: "",
          city: "",
          state: "",
          country: "India",
          postalCode: "",
          contact: "",
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSubmit = (data: UpdateDonorAddressRequestDto) => {
    updateAddress(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <div className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold text-[#005e38]">
            Update Your Address
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1">
            This address will be used by the collector to locate you. Please
            ensure it's accurate.
          </DialogDescription>
        </div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`space-y-1 ${
                  showContactField ? "sm:col-span-2" : "sm:col-span-3"
                }`}
              >
                <Label htmlFor="address" className="text-gray-700">
                  Address
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {showContactField && (
                <div className="space-y-1">
                  <Label htmlFor="contact" className="text-gray-700">
                    Contact number
                  </Label>
                  <Input
                    id="contact"
                    {...register("contact")}
                    className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="city" className="text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  {...register("city")}
                  className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="state" className="text-gray-700">
                  State
                </Label>
                <Input
                  id="state"
                  {...register("state")}
                  className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="country" className="text-gray-700">
                  Country
                </Label>
                <Input
                  id="country"
                  {...register("country")}
                  className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="postalCode" className="text-gray-700">
                  Postal Code
                </Label>
                <Input
                  id="postalCode"
                  {...register("postalCode")}
                  className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 bg-[#005e38] hover:bg-[#00472d] text-white rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Address"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleUseMyLocation}
                className="w-full sm:w-1/3 border-[#005e38] text-[#005e38] hover:bg-[#005e38]/10 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <Locate size={18} />
                <span>Use My Location</span>
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
