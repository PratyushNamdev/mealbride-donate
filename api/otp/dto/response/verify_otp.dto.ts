export interface VerifyOtpResponseDto {
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
  deliveryDate: string;
  status: "delivered";
  collectorId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
