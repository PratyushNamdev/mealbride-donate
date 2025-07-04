export interface GetActiveMealDto {
  _id: string;
  image: string;
  donorId: string;
  foodDesc: string;
  veg: boolean;
  feedsUpto: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  preferredTime: string;
  deliveryDate: string | null;
  expiryDate: string;
  status: "available" | "reserved" | "delivered" | "expired" | "cancelled";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}
export type GetActiveMealsResponseDto = GetActiveMealDto[];
