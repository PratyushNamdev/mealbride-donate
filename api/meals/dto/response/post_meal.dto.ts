export interface PostMealResponseDto {
  meal: {
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
    preferredTime: string; // ISO date string
    expiryDate: string; // ISO date string
    status: "available" | "reserved" | "delivered" | "expired" | "cancelled";
    collectorId: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  };
}
