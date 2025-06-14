"use client";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  Input,
  Button,
  Label,
  DialogTitle,
  DialogFooter,
} from "@ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DonorHooks from "@DonorHooks";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateDonorProfileRequestDto,
  updateDonorProfileRequestSchema,
} from "@/api/donor/dto/request/update_donor_profile";

export default function ProfileFormDialog({
  open,
  setOpen,
  username,
  contact,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  username: string;
  contact: string | null;
}) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateDonorProfileRequestDto>({
    mode: "onBlur",
    resolver: zodResolver(updateDonorProfileRequestSchema),
    defaultValues: {
      username: username,
      contact: contact ?? "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const { mutate: updateAddress, isPending } = DonorHooks.useUpdateDonorProfile(
    {
      onSuccess: (data) => {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["get-donor-profile"] });
        setOpen(false);
        reset({
          username: data.username,
          contact: data.contact ?? "",
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSubmit = (data: UpdateDonorProfileRequestDto) => {
    updateAddress(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg">
        <div className="mb-4 text-center">
          <DialogTitle className="text-2xl font-bold text-[#005e38]">
            Update Your Profile
          </DialogTitle>
        </div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username" className="text-gray-700">
                Name
              </Label>
              <Input
                id="username"
                {...register("username")}
                className="bg-gray-50 border-gray-300 focus:border-[#005e38] focus:ring focus:ring-[#005e38]/50"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
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
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-2/3 bg-[#005e38] hover:bg-[#00472d] text-white rounded-lg cursor-pointer"
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-1/3 border-[#005e38] text-[#005e38] hover:bg-[#005e38]/10 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Cancel</span>
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
