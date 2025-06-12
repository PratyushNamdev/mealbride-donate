"use client";
import MealHooks from "@MealHooks";
import {
  PostMealRequestDto,
  postMealRequestSchema,
} from "@/api/meals/dto/request/post_meal.dto";
import { Input, Textarea, Label, Button, Switch } from "@ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { BackButton } from "@atoms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function DonateNowForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<PostMealRequestDto>({
    mode: "onBlur",
    defaultValues: {
      image: "",
      feedsUpto: 0,
      foodDesc: "",
      veg: true,
      address: "",
      city: "",
      state: "",
      country: "India",
      postalCode: 0,
      preferredTime: new Date(),
      expiryDate: new Date(),
    },
    resolver: zodResolver(postMealRequestSchema),
  });
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { mutate: postMealMutate, isPending } = MealHooks.usePostMeal({
    onMutate: () => {},
    onSuccess: (response) => {
      toast.success("Thanks for Donating!", {
        description:
          "Your meal is now listed. A verified collector will soon book it and ensure it reaches someone in need.",
        className: "text-black",
        descriptionClassName: "text-black",
      });
      router.push("./my-active-meals");
      form.reset();
      setPreview(null);
      queryClient.invalidateQueries({ queryKey: ["get-active-meal"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const disabled = useMemo(() => isPending, [isPending]);

  const onSubmit = (data: PostMealRequestDto) => {
    postMealMutate({ ...data });
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="sm:p-4 h-full">
      <BackButton className="sm:mb-2" />
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full justify-center"
        >
          <div className="w-full max-w-[600px] p-4">
            <div className="flex flex-col items-center">
              <div
                className="w-28 h-28 sm:w-36 sm:h-36 cursor-pointer border border-dashed border-gray-300 rounded-full overflow-hidden flex items-center justify-center"
                onClick={() => fileRef.current?.click()}
              >
                <Image
                  src={
                    preview ??
                    "https://res.cloudinary.com/dgxvtemh2/image/upload/v1749034215/WhatsApp_Image_2025-06-04_at_13.19.31_14bc0d25_xrdsch.jpg"
                  }
                  alt="Upload"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p>Upload Meal Image</p>
            </div>

            <div className="flex mt-4 gap-2 justify-between">
              <div className="w-2/3">
                <Label className="mb-2">Description</Label>
                <Textarea
                  className="resize-none w-full"
                  rows={5}
                  {...register("foodDesc")}
                  placeholder="Describe the food (e.g., Dal and Rice)"
                />
                <div className="min-h-[20px]">
                  {errors.foodDesc && (
                    <p className="text-red-500 text-sm">
                      {errors.foodDesc.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 w-1/3">
                <div>
                  <Label className="mb-2">Feeds Upto</Label>
                  <Input
                    type="number"
                    {...register("feedsUpto", {
                      valueAsNumber: true,
                      validate: (val) =>
                        !isNaN(val) || "Feeds upto is required",
                    })}
                  />
                  {errors.feedsUpto && (
                    <p className="text-red-500 text-sm">
                      {errors.feedsUpto.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* <Label htmlFor="veg">Type</Label> */}

                  <div className="flex items-center gap-2">
                    <Switch
                      id="veg"
                      checked={!watch("veg")} // ON when veg is false (non-veg)
                      onCheckedChange={(val) => setValue("veg", !val)} // invert the logic
                      className={`
        data-[state=checked]:bg-red-500 
        data-[state=unchecked]:bg-green-500
      `}
                    />
                    <span className="text-sm">
                      {watch("veg") ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  {errors.veg && (
                    <p className="text-red-500 text-sm">{errors.veg.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:flex justify-between mb-4">
              <div className="mb-3">
                <Label className="mb-2">Preferred Time</Label>
                <Input
                  type="datetime-local"
                  {...register("preferredTime", { valueAsDate: true })}
                />
                {errors.preferredTime && (
                  <p className="text-red-500 text-sm">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2">Expiry Date</Label>
                <Input
                  type="datetime-local"
                  {...register("expiryDate", { valueAsDate: true })}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col mb-4 w-full">
              <div className="flex gap-2 w-full">
                <div className="w-full">
                  <Label className="mb-2">Address</Label>
                  <Input {...register("address")} />
                  {errors.address && (
                    <p className="text-red-500 text-sm ">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label className="mb-2">City</Label>
                  <Input {...register("city")} />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <Label className="mb-2">State</Label>
                  <Input {...register("state")} />
                  {errors.state && (
                    <p className="text-red-500 text-sm">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Label className="mb-2">Postal Code</Label>
                  <Input
                    type="number"
                    {...register("postalCode", { valueAsNumber: true })}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={"outline"}
                className="w-1/2 cursor-pointer"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                variant={"primary"}
                className="w-1/2 cursor-pointer"
                type="submit"
                disabled={disabled}
              >
                {disabled ? "Submitting..." : "Donate Now"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
