export interface GetMealHistoryDto {
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
  expiryDate: string;
  deliveryDate: string | null;
  status: "delivered" | "expired" | "cancelled";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export type GetMealHistoryResponseDto = GetMealHistoryDto[];