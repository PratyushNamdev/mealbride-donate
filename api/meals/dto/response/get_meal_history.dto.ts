export interface GetMealHistoryResponseDto {
  meals: GetMealHistoryDto[];
}

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
  postalCode: number;
  preferredTime: string;
  expiryDate: string;
  deliveryDate: string | null;
  status: "delivered" | "expired" | "cancelled";
  collectorId: string | null;
  createdAt: string;
  updatedAt: string;
}
